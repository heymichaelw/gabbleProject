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
  }
};
