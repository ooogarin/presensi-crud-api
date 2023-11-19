'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('attendance', {
      id_attendance: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      id_account: {
        type: Sequelize.UUID,
        allowNull: false
      },
      id_schedule: {
        type: Sequelize.UUID,
        defaultValue: null
      },
      event_name: {
        type: Sequelize.ENUM("LOGIN", "START", "END"),
        allowNull: false,
        defaultValue: "LOGIN"
      },
      locator_code: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      locator_latitude: {
        type: Sequelize.STRING(45),
        defaultValue: "-"
      },
      locator_longitude: {
        type: Sequelize.STRING(45),
        defaultValue: "-"
      },
      selfie: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: "-"
      },
      latitude: {
        type: Sequelize.STRING(45),
        allowNull: false,
        defaultValue: "-"
      },
      longitude: {
        type: Sequelize.STRING(45),
        allowNull: false,
        defaultValue: "-"
      },
      reason: {
        type: Sequelize.TEXT,
        defaultValue: "-"
      },
      attendance_start: {
        type: Sequelize.TIME,
      },
      attendance_finish: {
        type: Sequelize.TIME,
      },
      status_attendance: {
        type: Sequelize.STRING(30),
        defaultValue: '-'
      },
      date_attend: {
        type: Sequelize.DATE,
        allowNull: false
      },
      datetime_record: {
        type: Sequelize.DATE,
        allowNull: false
      },
      datetime_created: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('attendance');
  }
};