'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('locator', [
      {
        id_locator: "458211ab-5f85-41f1-8f54-6975038e5e44",
        id_shifting: "fefc840d-419c-4c27-8675-e94a60bfa3b2",
        id_schedule: "4024baff-5f82-4564-a242-0ae2fbfcea9f",
        locator_code: "locator-code",
        latitude: "-",
        longitude: "-",
        use_location: "Y",
        status_locator: "ACT",
        datetime_created: "0000-00-00 00:00:00",
        datetime_edited: "0000-00-00 00:00:00"
      },
      {
        id_locator: "5d988b10-22dd-4c3a-b7f1-f3fd753f7dba",
        id_shifting: "e8b9a27c-635d-44cf-89c7-a051fb6d1e51",
        id_schedule: "aeed1e5d-e344-4112-a602-50b3bce9c618",
        locator_code: "locator-code",
        latitude: "-",
        longitude: "-",
        use_location: "Y",
        status_locator: "ACT",
        datetime_created: "0000-00-00 00:00:00",
        datetime_edited: "0000-00-00 00:00:00"
      },
      {
        id_locator: "fa705ad7-3b49-4b76-9406-21d0bfb77f36",
        id_shifting: "2de3b962-2f73-4547-a2b3-60c96a3f6c6a",
        id_schedule: "87c4f087-7d21-4fff-8995-c31d2dac54e8",
        locator_code: "locator-code",
        latitude: "-",
        longitude: "-",
        use_location: "Y",
        status_locator: "ACT",
        datetime_created: "0000-00-00 00:00:00",
        datetime_edited: "0000-00-00 00:00:00"
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('locator', null, {});
  }
};
