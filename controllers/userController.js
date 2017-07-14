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
    var context = {
      next : req.query.next
    };
    console.log(req.query.next);
    res.render('users/login', context);
  },
  login: function(req, res){
    var name = req.body.name;
    var password = req.body.password;
    var nextPage = req.body.next;
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
        res.redirect(nextPage);
      } else {
        res.redirect('signup');
      }
    });
  },
  gabPage: function(req, res){
    var gabList = models.Gab.findAll({
      where: {
        user_id: req.session.userId
      }
    }).then(function(gabList){
      console.log(gabList);
      res.render('users/mygabs', gabList);
    });
  }
};
