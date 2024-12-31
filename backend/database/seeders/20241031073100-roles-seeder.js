'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [
      {
        name: 'Admin',
        description: 'Administrator with full access to manage the system.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Editor',
        description: 'User with permission to edit and manage content.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'User',
        description: 'Regular user with limited access to resources.',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
