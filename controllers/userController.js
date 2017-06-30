const session = require('express-session');
const models = require('../models');

module.exports = {
  signup: function(req, res){
    res.render('users/signup', {});
  },
  create: function(req, res){
    req.getValidationResult().then(function (result){
      if (result.isEmpty()) {
        models.User.create({
          name: req.body.name,
          password: req.body.password
        }).then(function(newUser){
          req.session.userId = newUser.id;
          res.redirect('signup');
        });
      }
    });
  },
  loginPage: function(req, res){
    res.render('users/login', {});
  },
  login: function(req, res){
    var name = req.body.name;
    var password = req.body.password;
    models.User.findOne({
      where: {
        name: name
      }
    }).then(function(user){
      if (password === user.password) {
        req.session.user = user;
        req.session.name = user.name;
        req.session.userId = user.id;
        console.log('Welcome ' + req.session.name);
        res.redirect('login');
      } else {
        res.redirect('signup');
      }
    });
  }
};
