const express = require('express');
const models = require('../models');
const sequelize = require('sequelize');
const userController = require('../controllers/userController');
const gabController = require('../controllers/gabController');
const session = require('express-session');
const helpers = require('../helpers.js')

const router = express.Router();


module.exports = function(app){
  app.get('/user/signup', userController.signup);
  app.post('/user/signup', userController.create);

  app.get('/user/login', userController.loginPage);
  app.post('/user/login', userController.login);

  app.get('/user/gabs', helpers.redirectMiddleware, userController.gabPage);

  app.get('/gab/create', helpers.redirectMiddleware, gabController.createPage);
  app.post('/gab/create', gabController.create);
};
