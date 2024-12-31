'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Blogs', [
      {
        image: 'https://i.pinimg.com/originals/b2/46/8f/b2468f173babb6aacd76a75ba5d65056.png',
        title: 'How to Learn JavaScript in 2024',
        slug: 'how-to-learn-javascript-in-2024',
        excerpt: 'A guide to becoming proficient in JavaScript by the end of 2024.',
        status: 'Published',
        user_id: 1, // Thay bằng user_id hợp lệ từ bảng Users
        content: 'JavaScript is an essential language for web development. In this article, we cover...',
        language: 'vietnamese',
        category_id: 1, // Thay bằng category_id hợp lệ từ bảng Categories
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        image: 'https://i.pinimg.com/originals/b2/46/8f/b2468f173babb6aacd76a75ba5d65056.png',
        title: 'Les bases du DevOps',
        slug: 'les-bases-du-devops',
        excerpt: 'Introduction aux principes fondamentaux du DevOps.',
        status: 'Draft',
        user_id: 2, // Thay bằng user_id hợp lệ từ bảng Users
        content: 'Le DevOps est une méthodologie qui combine le développement et les opérations pour...',
        language: 'french',
        category_id: 2, // Thay bằng category_id hợp lệ từ bảng Categories
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        image: 'https://i.pinimg.com/originals/b2/46/8f/b2468f173babb6aacd76a75ba5d65056.png',
        title: 'Understanding Cloud Computing',
        slug: 'understanding-cloud-computing',
        excerpt: 'An overview of the cloud computing ecosystem in 2024.',
        status: 'Archived',
        user_id: 3, // Thay bằng user_id hợp lệ từ bảng Users
        content: 'Cloud computing has revolutionized the way businesses operate. This article explores...',
        language: 'english',
        category_id: 3, // Thay bằng category_id hợp lệ từ bảng Categories
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Blogs', null, {});
  }
};
