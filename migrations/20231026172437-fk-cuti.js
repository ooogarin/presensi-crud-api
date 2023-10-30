'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // fk id_account
    await queryInterface.addConstraint('cuti', {
      fields: ['id_account'],
      type: 'foreign key',
      name: 'fk_cuti-id_account',
      references: {
        table: 'account',
        field: 'id_account'
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    // fk id_account
    await queryInterface.removeConstraint('cuti', 'fk_cuti-id_account');
  }
};
