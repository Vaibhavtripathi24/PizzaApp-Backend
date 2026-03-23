const express = require('express');
const { createUser } = require('../controllers/userController');

//we have to initilize a router object to add route in a new file
//Routers are used for segegating the routes in different files and then we can use them in the main file
const userRouter = express.Router();

userRouter.post('/:id', createUser);
//userRouter.get('/', getUser); //this is a route regitration

module.exports = userRouter; //exporting the router to use in the main file