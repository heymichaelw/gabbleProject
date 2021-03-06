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
        res.redirect('gabs');
      } else {
        res.redirect('signup');
      }
    });
  },
  logout: function(req, res){
    delete req.session.user;
    delete req.session.name;
    delete req.session.userId;
    res.redirect('/');
  },
  myGabPage: function(req, res){
    models.Gab.findAll({
      where: {
        user_id: req.session.userId
      }
    }).then(function(gabList){
      var context = {
        gabList: gabList,
        user: req.session.user
      };
      res.render('users/mygabs', context);
    });
  }
};
