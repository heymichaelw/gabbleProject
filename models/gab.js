'use strict';
module.exports = function(sequelize, DataTypes) {
  var Gab = sequelize.define('Gab', {
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    text: DataTypes.STRING(140)
  }, {});
  Gab.associate = function(models){
    Gab.belongsTo(models.User, {as: 'user', foreignKey: 'user_id', onDelete: 'cascade', hooks: true});
    Gab.belongsToMany(models.User, {
      as: "UserLikes",
      through: "Likes",
      foreignKey: "gab_id",
      onDelete: 'cascade',
      hooks: true
    });
  };

    Gab.prototype.showLikeIfNotOwner = function() {
        return function (val, render) {
            const id = render(val);
            if (!isNaN(parseInt(id)) && id != this.user_id) {
                // render the like button
                return render(` <form class="" action="/gab/like" method="post">
          <input type="hidden" name="id" value="{{id}}" >
          <input type="submit" value="Like"></form>`);
            }
        };
    };
  return Gab;
};
