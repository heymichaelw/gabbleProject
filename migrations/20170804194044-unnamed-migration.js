'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [queryInterface.changeColumn(
        'Likes',
        'user_id',
        {
          type: Sequelize.INTEGER,
          onDelete: 'cascade',
          onUpdate: 'cascade'
        }
    ), queryInterface.changeColumn(
        'Likes',
        'gab_id',
        {
          type: Sequelize.INTEGER,
          onDelete: 'cascade',
          onUpdate: 'cascade'
        }
    )]
  },

  down: function (queryInterface, Sequelize) {

  }
};
