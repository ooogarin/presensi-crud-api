'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert('schedule', [
      {
        id_schedule: "4024baff-5f82-4564-a242-0ae2fbfcea9f",
        id_account: "2c39e1c3-db7e-4a78-8a6a-2ab41f80145e",
        id_shifting: "fefc840d-419c-4c27-8675-e94a60bfa3b2",
        shift_schedule: "0000-00-00",
        status_schedule: "ACT",
        datetime_created: "0000-00-00 00:00:00",
        datetime_edited: "0000-00-00 00:00:00"
      },
      {
        id_schedule: "aeed1e5d-e344-4112-a602-50b3bce9c618",
        id_account: "2edc534b-8dbb-4137-a6d1-fd4dd26e7510",
        id_shifting: "e8b9a27c-635d-44cf-89c7-a051fb6d1e51",
        shift_schedule: "0000-00-00",
        status_schedule: "ACT",
        datetime_created: "0000-00-00 00:00:00",
        datetime_edited: "0000-00-00 00:00:00"
      },
      {
        id_schedule: "87c4f087-7d21-4fff-8995-c31d2dac54e8",
        id_account: "532cba4e-6ce9-46cc-b49a-f37964d9f9e4",
        id_shifting: "2de3b962-2f73-4547-a2b3-60c96a3f6c6a",
        shift_schedule: "0000-00-00",
        status_schedule: "ACT",
        datetime_created: "0000-00-00 00:00:00",
        datetime_edited: "0000-00-00 00:00:00"
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('schedule', null, {});
  }
};
