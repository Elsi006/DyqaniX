const RedRoseController = require('../controllers/redrose.contollers');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Set the destination folder

module.exports = (app) => {
  
    app.get('/api/products', RedRoseController.getAllProducts);
    app.post('/api/product', RedRoseController.createProduct);
    app.patch('/api/products/import', upload.single('excelFile'), RedRoseController.importProducts);
    app.get('/api/product/:id', RedRoseController.getOneProduct);
    app.put('/api/product/:id', RedRoseController.getOneAndUpdateProduct);
    app.delete('/api/product/:id', RedRoseController.deleteProduct);
    


}

