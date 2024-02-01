const Order = require('../models/order.model');
 
module.exports.getAllProducts = (req, res) => {
    Order.find()
        .then((allProducts) => {
            res.json({ products: allProducts })
        })
        .catch((err) => {
            res.json({ message: 'Cannot get all the products', error: err })
        });
}
 
module.exports.getOneOrder = (req, res) => {
    Order.findOne({ _id: req.params.id })
        .then(oneSingleOrder => {
            res.json({ order: oneSingleOrder })
        })
        .catch((err) => {
            res.json({ message: 'Cannot get one single product', error: err })
        });}


module.exports.createOrder = (req, res) => {
            const { products } = req.body;
        
            // Assuming you have an Order schema with a "products" field
            Order.create({ products })
                .then(newlyCreatedOrder => {
                    res.json({ order: newlyCreatedOrder });
                })
                .catch((err) => {
                    res.json({ message: 'Cannot create order', error: err });
                });
        };
module.exports.getOneAndUpdateProduct = (req, res) => {
    Order.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedProduct => {
            res.json({ product: updatedProduct })
        })
        .catch((err) => {
            res.json({ message: 'Cannot update product', error: err })
        });}
 
module.exports.deleteProduct = (req, res) => {
    Order.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result })
        })
        .catch((err) => {
            res.json({ message: 'Cannot delete product', error: err })
        });}
