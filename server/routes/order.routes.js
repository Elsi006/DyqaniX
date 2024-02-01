const OrderController = require('../controllers/order.contollers');
module.exports = (app) => {
  
    app.get('/api/orders', OrderController.getAllProducts);
    app.post('/api/order', OrderController.createOrder);
    app.get('/api/order/:id', OrderController.getOneOrder);
    app.put('/api/order/:id', OrderController.getOneAndUpdateProduct);
    app.delete('/api/order/:id', OrderController.deleteProduct);
}

