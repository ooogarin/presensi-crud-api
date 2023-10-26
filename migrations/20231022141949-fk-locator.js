'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // fk id_shifting
    await queryInterface.addConstraint('locator', {
      fields: ['id_shifting'],
      type: 'foreign key',
      name: 'fk_locator-id_shifting',
      references: {
        table: 'shifting',
        field: 'id_shifting'
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE'
    });

    // fk id_schedule
    await queryInterface.addConstraint('locator', {
      fields: ['id_schedule'],
      type: 'foreign key',
      name: 'fk_locator-id_schedule',
      references: {
        table: 'schedule',
        field: 'id_schedule'
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    // fk id_shifting
    await queryInterface.removeConstraint('locator', 'fk_locator-id_shifting');

    // fk id_schedule
    await queryInterface.removeConstraint('locator', 'fk_locator-id_schedule');
  }
};
