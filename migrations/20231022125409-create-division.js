'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('division', {
      id_division: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      division_sname: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: "-"
      },
      division_lname: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: "-"
      },
      division_description: {
        type: Sequelize.STRING(200),
        allowNull: false,
        defaultValue: "-"
      },
      status_division: {
        type: Sequelize.ENUM("ACT", "NACT"),
        allowNull: false,
        defaultValue: "ACT"
      },
      datetime_created: {
        type: Sequelize.DATE,
        allowNull: false
      },
      datetime_edited: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('division');
  }
};