"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("skills", [
      {
        user_id: 1,
        technical_skills: "c, c++, java",
        other_skills: "chess, ukulele player",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("skills", null, {});
  },
};
