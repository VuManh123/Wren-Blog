'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        articleCount: 5,
        name: 'Technology',
        imageUrl: 'https://images2.thanhnien.vn/528068263637045248/2024/1/25/c3c8177f2e6142e8c4885dbff89eb92a-65a11aeea03da880-1706156293184503262817.jpg',
        slug: 'technology',
        description: 'Everything about the latest in technology, gadgets, and software.',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        articleCount: 3,
        name: 'Health & Wellness',
        imageUrl: 'https://images2.thanhnien.vn/528068263637045248/2024/1/25/c3c8177f2e6142e8c4885dbff89eb92a-65a11aeea03da880-1706156293184503262817.jpg',
        slug: 'health-wellness',
        description: 'Tips and insights for a healthier and balanced lifestyle.',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        articleCount: 8,
        name: 'Travel',
        imageUrl: 'https://images2.thanhnien.vn/528068263637045248/2024/1/25/c3c8177f2e6142e8c4885dbff89eb92a-65a11aeea03da880-1706156293184503262817.jpg',
        slug: 'travel',
        description: 'Discover amazing places and travel tips around the globe.',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        articleCount: 0,
        name: 'Education',
        imageUrl: 'https://images2.thanhnien.vn/528068263637045248/2024/1/25/c3c8177f2e6142e8c4885dbff89eb92a-65a11aeea03da880-1706156293184503262817.jpg',
        slug: 'education',
        description: 'Resources and articles to help you learn and grow.',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
