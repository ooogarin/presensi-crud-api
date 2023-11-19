'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('shift_type', [
      {
        id_shift_type: "092fc8f6-9f59-4829-aeb4-7d1fa22ff1d0",
        type_sname: "NRM",
        type_lname: "Normal",
        type_description: "Shift normal",
        status_shift_type: "ACT",
        datetime_created: "0000-00-00 00:00:00",
        datetime_edited: "0000-00-00 00:00:00"
      },
      {
        id_shift_type: "f3653ab6-621b-4523-a5e7-26370f53afde",
        type_sname: "OVT",
        type_lname: "Overtime",
        type_description: "Shift lembur",
        status_shift_type: "ACT",
        datetime_created: "0000-00-00 00:00:00",
        datetime_edited: "0000-00-00 00:00:00"
      },
      {
        id_shift_type: "0b302701-c3a8-45d2-8fcd-8360dc341d4a",
        type_sname: "HLD",
        type_lname: "Holiday",
        type_description: "Shift hari libur",
        status_shift_type: "ACT",
        datetime_created: "0000-00-00 00:00:00",
        datetime_edited: "0000-00-00 00:00:00"
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('shift_type', null, {});
  }
};
