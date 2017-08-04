'use strict';
module.exports = function(sequelize, DataTypes) {
  var Gab = sequelize.define('Gab', {
    user_id: DataTypes.INTEGER,
    text: DataTypes.STRING(140)
  }, {});
  Gab.associate = function(models){
    Gab.belongsTo(models.User, {as: 'user', foreignKey: 'user_id'});
    Gab.belongsToMany(models.User, {
      as: "UserLikes",
      through: "Likes",
      foreignKey: "gab_id"
    });
  };

    Gab.prototype.showLikeIfNotOwner = function() {
        return function (val, render) {
            const id = render(val);
            if (id != this.user_id) {
                // render the like button
                return render(` <form class="" action="/gab/like" method="post">
          <input type="hidden" name="id" value="{{id}}" >
          <input type="submit" value="Like"></form>`);
            }
        };
    };
  return Gab;
};
