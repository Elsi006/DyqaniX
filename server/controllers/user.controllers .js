const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY, { expiresIn: "5h" });

        res.cookie("token", token, { httpOnly: true, maxAge: 5 * 60 * 60 * 1000 });

        res.status(200).json({ message: "Login successful", user: user ,token : token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

 
module.exports.register = async (req, res) => {
    try {
        const newUser = await User.create( req.body);
        const token = jwt.sign({
            id:newUser._id
        } ,process.env.SECRET_KEY, { expiresIn: "5h" });


        res.cookie("token", token, { httpOnly: true, maxAge: 5 * 60 * 60 * 1000 });
        res.status(200).json({ message: "Login successful", user: newUser , token : token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports.logout = (req,res) => {
    res.clearCookie('token'), sendStatus(200).json({message:"Success"})
}