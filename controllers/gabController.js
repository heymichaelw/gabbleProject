const session = require('express-session');
const models = require('../models');

module.exports = {
  createPage: function(req, res){
    res.render('gabs/create', {});
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
    res.redirect('create');
  },
  list: function(req, res){
    models.Gab.findAll({})
    .then(function(gabList){
      res.render('gabs/list', { gabList: gabList });
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
          res.redirect('list');
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
