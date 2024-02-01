const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();
app.use(cookieParser());
           
app.use(cors({
    origin :'http://localhost:5173',
    credentials:true, 
}));

const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Set the destination folder



app.use(express.json());                           /* This is new and allows JSON Objects to be posted */
app.use(express.urlencoded({ extended: true }));   /* This is new and allows JSON Objects with strings and arrays*/
require('./config/mongoose.config');    /* This is new */
require('./routes/redrose.routes')(app);
require('./routes/order.routes')(app);
require('./routes/user.routes')(app);
app.listen(8000, () => {
    console.log("Listening at Port 8000")
})

