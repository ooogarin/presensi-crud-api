'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // fk id_division
    await queryInterface.addConstraint('shifting', {
      fields: ['id_division'],
      type: 'foreign key',
      name: 'fk_shifting-id_division',
      references: {
        table: 'division',
        field: 'id_division'
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE'
    });

    // fk id_shift_type
    await queryInterface.addConstraint('shifting', {
      fields: ['id_shift_type'],
      type: 'foreign key',
      name: 'fk_shifting-id_shift_type',
      references: {
        table: 'shift_type',
        field: 'id_shift_type'
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    // fk id_division
    await queryInterface.removeConstraint('shifting', 'fk_shifting-id_division');

    // fk id_shift_type
    await queryInterface.removeConstraint('shifting', 'fk_shifting-id_shift_type');
  }
};
