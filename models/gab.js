'use strict';
module.exports = function(sequelize, DataTypes) {
  var Gab = sequelize.define('Gab', {
    user_id: DataTypes.INTEGER,
    text: DataTypes.STRING(140)
  }, {});
  Gab.associate = function(models){
    Gab.belongsTo(models.User, {foreignKey: 'user_id'});
    Gab.belongsToMany(models.User, {
      as: "UserLikes",
      through: "Likes",
      foreignKey: "gab_id"
    });
  };
  return Gab;
};
