"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("todos", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      description: { type: Sequelize.STRING, allowNull: false },
      date_echeance: { type: Sequelize.DATE, allowNull: false }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("todos")
  }
}
