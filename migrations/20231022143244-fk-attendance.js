'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // fk id_account
    await queryInterface.addConstraint('attendance', {
      fields: ['id_account'],
      type: 'foreign key',
      name: 'fk_attendance-id_account',
      references: {
        table: 'account',
        field: 'id_account'
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE'
    });

    // fk id_schedule
    await queryInterface.addConstraint('attendance', {
      fields: ['id_schedule'],
      type: 'foreign key',
      name: 'fk_attendance-id_schedule',
      references: {
        table: 'schedule',
        field: 'id_schedule'
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    // fk id_account
    await queryInterface.removeConstraint('attendance', 'fk_attendance-id_account');

    // fk id_schedule
    await queryInterface.removeConstraint('attendance', 'fk_attendance-id_schedule');
  }
};
