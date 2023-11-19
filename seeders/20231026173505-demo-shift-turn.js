'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('shift_turn', [
      {
        id_shift_turn: "5329c79e-09c7-4976-baf8-93089e98718f",
        turn_sname: "S1",
        turn_lname: "Shift 1",
        turn_description: "shift turn_description 1",
        status_shift_turn: "ACT",
        datetime_created: "0000-00-00 00:00:00",
        datetime_edited: "0000-00-00 00:00:00"
      },
      {
        id_shift_turn: "e0d1b29f-fcb7-4d56-91f9-e5773b6818ac",
        turn_sname: "S2",
        turn_lname: "Shift 2",
        turn_description: "shift turn_description 2",
        status_shift_turn: "ACT",
        datetime_created: "0000-00-00 00:00:00",
        datetime_edited: "0000-00-00 00:00:00"
      },
      {
        id_shift_turn: "65e7a50c-0af9-409e-829c-6e3ad810c643",
        turn_sname: "S3",
        turn_lname: "Shift 3",
        turn_description: "shift turn_description 3",
        status_shift_turn: "ACT",
        datetime_created: "0000-00-00 00:00:00",
        datetime_edited: "0000-00-00 00:00:00"
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('shift_turn', null, {});
  }
};
