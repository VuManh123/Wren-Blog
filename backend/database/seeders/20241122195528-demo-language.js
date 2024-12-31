'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Languages', [
      {
        code: 'en',
        name: 'English',
        flag: '🇬🇧', // Có thể sử dụng URL ảnh lá cờ hoặc biểu tượng
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 'fr',
        name: 'French',
        flag: '🇫🇷',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 'es',
        name: 'Spanish',
        flag: '🇪🇸',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 'de',
        name: 'German',
        flag: '🇩🇪',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 'ja',
        name: 'Japanese',
        flag: '🇯🇵',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Languages', null, {});
  }
};
