'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     * email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    image: DataTypes.STRING,
    roleId: DataTypes.STRING
    */
    await queryInterface.bulkInsert('users', [{
      email: 'johndoe@gmail.com',
      password: '123456',
      firstName: 'John',
      lastName: 'Doe',
      address: 'USA',
      gender: 1,
      image: 'https://menback.com/wp-content/uploads/2020/05/trai-tay-dep.jpg',
      roleId: 'ROLE',
      phoneNumber: 'R1',
      positionId: 'R1',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
