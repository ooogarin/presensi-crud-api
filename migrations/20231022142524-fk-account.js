'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // fk id_account_level
    await queryInterface.addConstraint('account', {
      fields: ['id_account_level'],
      type: 'foreign key',
      name: 'fk_account-id_account_level',
      references: {
        table: 'account_level',
        field: 'id_account_level'
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    // fk id_account_level
    await queryInterface.removeConstraint('account', 'fk_account-id_account_level');
  }
};
