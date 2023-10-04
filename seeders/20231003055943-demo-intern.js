"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("interns", [
      {
        first_name: "John",
        last_name: "Doe",
        email: "example@example.com",
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("interns", null, {});
  },
};
