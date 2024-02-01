const Product = require('../models/product.model');
const readXlsxFile = require('read-excel-file/node');

module.exports.importProducts = async (req, res) => {
    console.log('Received file:', req.file);

    if (!req.file) {
        return res.status(400).json({ message: 'No Excel file provided' });
    }

    try {
        // Read the Excel file
        const rows = await readXlsxFile(req.file.path);

        // Assuming rows contain an array of products with properties matching your schema
        const productUpdates = rows.map((row) => {
            const filter = { barcode: row[2] }; 
            const update = {
                title: row[0],
                product: row[1],
                quantity: row[3],
                priceofpurchase: row[4],
                priceofsell: row[5],
                newQuanity: row[6] !== undefined ? row[6] : 1, // Set default value if not present
                totalPrice: row[7] !== undefined ? row[7] : 0,   // Set default value if not present
           
            };

            // Use findOneAndUpdate with upsert:true to update existing records or insert new ones
            return Product.findOneAndUpdate(filter, update, { upsert: true, new: true });
        });

        // Wait for all product updates to complete
        const updatedProducts = await Promise.all(productUpdates);

        res.json({ products: updatedProducts });
    } catch (err) {
        res.status(500).json({ message: 'Cannot update products from Excel file', error: err });
    }
};

module.exports.getAllProducts = (req, res) => {
    Product.find()
        .then((allProducts) => {
            res.json({ products: allProducts })
        })
        .catch((err) => {
            res.json({ message: 'Cannot get all the products', error: err })
        });
}
 
module.exports.getOneProduct = (req, res) => {
    Product.findOne({ _id: req.params.id })
        .then(oneSingleProduct => {
            res.json({ product: oneSingleProduct })
        })
        .catch((err) => {
            res.json({ message: 'Cannot get one single product', error: err })
        });}
 
module.exports.createProduct = (req, res) => {
    Product.create(req.body)
        .then(newlyCreatedProduct => {
            res.json({ product: newlyCreatedProduct })
        })
        .catch((err) => {
            res.json({ message: 'Cannot create product', error: err })
        });}
 
module.exports.getOneAndUpdateProduct = (req, res) => {
    Product.findOneAndUpdate(
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
    Product.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result })
        })
        .catch((err) => {
            res.json({ message: 'Cannot delete product', error: err })
        });}
