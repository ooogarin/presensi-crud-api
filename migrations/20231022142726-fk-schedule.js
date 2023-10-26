'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // fk id_account
    await queryInterface.addConstraint('schedule', {
      fields: ['id_account'],
      type: 'foreign key',
      name: 'fk_schedule-id_account',
      references: {
        table: 'account',
        field: 'id_account'
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE'
    });

    // fk id_shifting
    await queryInterface.addConstraint('schedule', {
      fields: ['id_shifting'],
      type: 'foreign key',
      name: 'fk_schedule-id_shifting',
      references: {
        table: 'shifting',
        field: 'id_shifting'
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    // fk id_account
    await queryInterface.removeConstraint('schedule', 'fk_schedule-id_account');

    // fk id_shifting
    await queryInterface.removeConstraint('schedule', 'fk_schedule-id_shifting');
  }
};
