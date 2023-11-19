'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('shifting', [
      {
        id_shifting: "fefc840d-419c-4c27-8675-e94a60bfa3b2",
        id_division: "071f4322-2351-4ca6-85a6-abb6adcb53b2",
        id_shift_type: "092fc8f6-9f59-4829-aeb4-7d1fa22ff1d0",
        shift_type: "NRM",
        id_shift_turn: "5329c79e-09c7-4976-baf8-93089e98718f",
        shift_turn: "S1",
        shift_start: "00:00:00",
        shift_end: "00:00:00",
        status_shifting: "ACT",
        datetime_created: "0000-00-00 00:00:00",
        datetime_edited: "0000-00-00 00:00:00"
      },
      {
        id_shifting: "e8b9a27c-635d-44cf-89c7-a051fb6d1e51",
        id_division: "bb285a6c-713a-11ee-ab30-d8bbc1cf618f",
        id_shift_type: "f3653ab6-621b-4523-a5e7-26370f53afde",
        shift_type: "OVT",
        id_shift_turn: "e0d1b29f-fcb7-4d56-91f9-e5773b6818ac",
        shift_turn: "S2",
        shift_start: "00:00:00",
        shift_end: "00:00:00",
        status_shifting: "ACT",
        datetime_created: "0000-00-00 00:00:00",
        datetime_edited: "0000-00-00 00:00:00"
      },
      {
        id_shifting: "2de3b962-2f73-4547-a2b3-60c96a3f6c6a",
        id_division: "6e5aecbb-8259-404a-abbe-f496a5ebfded",
        id_shift_type: "0b302701-c3a8-45d2-8fcd-8360dc341d4a",
        shift_type: "HLD",
        id_shift_turn: "65e7a50c-0af9-409e-829c-6e3ad810c643",
        shift_turn: "S3",
        shift_start: "00:00:00",
        shift_end: "00:00:00",
        status_shifting: "ACT",
        datetime_created: "0000-00-00 00:00:00",
        datetime_edited: "0000-00-00 00:00:00"
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('shifting', null, {});
  }
};
