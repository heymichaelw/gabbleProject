const express = require('express');
const models = require('../models');
const sequelize = require('sequelize');
const userController = require('../controllers/userController');
const session = require('express-session');

const router = express.Router();


module.exports = function(app){
  app.get('/user/signup', userController.signup);
  app.post('/user/signup', userController.create);
  app.get('/user/login', userController.loginPage);
  app.post('/user/login', userController.login);
};
