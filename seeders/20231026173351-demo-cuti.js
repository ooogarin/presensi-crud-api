'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cuti', [
      {
        id_cuti: "d84fede3-2fed-4235-882a-45c921dd7ef9",
        id_account: "532cba4e-6ce9-46cc-b49a-f37964d9f9e4",
        cuti_description: "Cuti hari raya",
        datetime_created: "0000-00-00 00:00:00",
        datetime_edited: "0000-00-00 00:00:00"
      },
      {
        id_cuti: "c9db78ee-8998-4818-a109-6a2e1b89a6ce",
        id_account: "2edc534b-8dbb-4137-a6d1-fd4dd26e7510",
        cuti_description: "Cuti hari raya",
        datetime_created: "0000-00-00 00:00:00",
        datetime_edited: "0000-00-00 00:00:00"
      },
      {
        id_cuti: "96f7734f-7297-4000-900b-3322d6de5e18",
        id_account: "6d81400c-7128-11ee-ab30-d8bbc1cf618f",
        cuti_description: "Cuti hari raya",
        datetime_created: "0000-00-00 00:00:00",
        datetime_edited: "0000-00-00 00:00:00"
      }
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cuti', null, {});
  }
};
