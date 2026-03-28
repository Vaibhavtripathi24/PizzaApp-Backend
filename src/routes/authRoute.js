const express = require('express');
const { login } = require('../controllers/authController.js');

//we have to initilize a router object to add route in a new file
//Routers are used for segegating the routes in different files and then we can use them in the main file
const authRouter = express.Router();

authRouter.post('/login', login);
//authRouter.get('/', getUser); //this is a route regitration

module.exports = authRouter; //exporting the router to use in the main file