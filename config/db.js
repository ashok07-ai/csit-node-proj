const { Sequelize } = require("sequelize")

const sequelize = new Sequelize('db_student', 'root', '', {
    host: 'localhost',
    dialect: "mysql"
});

module.exports = sequelize