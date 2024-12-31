'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'admin',
        email: 'admin@example.com',
        password: 'hashed_password_1', // Thay bằng hash password thật nếu cần
        first_name: 'System',
        last_name: 'Admin',
        profileImage: 'https://i.pinimg.com/originals/b2/46/8f/b2468f173babb6aacd76a75ba5d65056.png',
        bio: 'Administrator account for managing the system.',
        role_id: 1, // ID tương ứng trong bảng Roles
        date: new Date(),
        active: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'john_doe',
        email: 'john.doe@example.com',
        password: 'hashed_password_2',
        first_name: 'John',
        last_name: 'Doe',
        profileImage: 'https://i.pinimg.com/originals/b2/46/8f/b2468f173babb6aacd76a75ba5d65056.png',
        bio: 'A sample user for demo purposes.',
        role_id: 2,
        date: new Date(),
        active: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'jane_doe',
        email: 'jane.doe@example.com',
        password: 'hashed_password_3',
        first_name: 'Jane',
        last_name: 'Doe',
        profileImage: 'https://i.pinimg.com/originals/b2/46/8f/b2468f173babb6aacd76a75ba5d65056.png',
        bio: 'Another sample user for demo purposes.',
        role_id: 2,
        date: new Date(),
        active: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
