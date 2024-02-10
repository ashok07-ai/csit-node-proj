const { Sequelize } = require("sequelize")

const sequelize = new Sequelize('db_student', 'root', 'Ashok@777', {
    host: 'localhost',
    dialect: "mysql"
});

module.exports = sequelize