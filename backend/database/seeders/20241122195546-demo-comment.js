'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Comments', [
      {
        content: 'Great article! I learned a lot.',
        status: 'Approved',
        user_id: 1, // Thay bằng user_id hợp lệ từ bảng Users
        blog_id: 1, // Thay bằng blog_id hợp lệ từ bảng Blogs
        reply: JSON.stringify([]), // Không có trả lời cho bình luận này
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        content: 'I think there is a typo in the second paragraph.',
        status: 'Pending',
        user_id: 2, // Thay bằng user_id hợp lệ từ bảng Users
        blog_id: 1,
        reply: JSON.stringify([]),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        content: 'Can you explain more about this topic?',
        status: 'Approved',
        user_id: 3, // Thay bằng user_id hợp lệ từ bảng Users
        blog_id: 2, // Thay bằng blog_id hợp lệ từ bảng Blogs
        reply: JSON.stringify([
          {
            user_id: 1, // Người trả lời
            content: 'Sure, I will update the article with more details.',
            created_at: new Date()
          }
        ]),
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
