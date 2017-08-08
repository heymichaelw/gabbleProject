const session = require('express-session');
const models = require('../models');

module.exports = {
  createPage: function(req, res){
    var context = {
      user: req.session.user
    };
    res.render('gabs/create', context);
  },
  create: function(req, res){
    req.getValidationResult().then(function(result){
      if(result.isEmpty()){
        models.Gab.create({
          user_id: req.session.userId,
          text: req.body.gabtext
        });
      }
    });
    res.redirect('/user/gabs');
  },
  delete: function(req, res){
    models.Gab.destroy({
        where: {
          id : req.params.id
        }
    });
    res.redirect('/user/gabs');
  }
  ,
  list: function(req, res){
    models.Gab.findAll({include: [{
        model: models.User,
        as: 'user'
    }, 'UserLikes'],
        order: [
            ['createdAt', 'DESC']
        ]})
    .then(function(gabList){
      var context = {
          gabList: gabList,
          loggedInUser: req.session.userId,
          user: req.session.user
      };
      res.render('gabs/list', context);
    });
  },
  createLike: function(req, res){
    req.getValidationResult().then(function(result){
      if(result.isEmpty()){
        models.Gab.findOne({
          where: {
            id: req.body.id
          }
        }).then(function(gab){
          gab.addUserLikes(req.session.userId);
          res.redirect('/');
        });
      }
    });
  },
  listLikes: function(req, res){
    models.Gab.findOne({
      where: {
        id: req.body.id
      }
    }).then(function(gab){
      gab.getUserLikes().then(function(likes){
        likes.forEach(function(liker){
          console.log("LIKER: " + liker.name);
          if (req.session.userId === liker.id) {
            console.log("YOU LIKED THIS!");
          }
        });
      });
    });
  }
};
