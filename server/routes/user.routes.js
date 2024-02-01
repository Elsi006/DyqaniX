const  UserController = require('../controllers/user.controllers ')
const  {authenticate} = require('../config/jwt.config')
const jwt = require('jsonwebtoken');


module.exports = (app) => {
  
    app.post('/api/register', UserController.register);
    app.post('/api/login', UserController.login);
    app.post('/api/logout', authenticate ,UserController.logout);

}

