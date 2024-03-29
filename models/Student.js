const db = require("../config/db.js")
const { DataTypes } = require("sequelize")
const Book = require("../models/Book.js")
const Student = db.define('Student', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false

    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    faculty: {
        type: DataTypes.ENUM('CSIT', 'BCA'),
        allowNull: false
    },
    dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false

    }
},
    {
        tableName: 'students',
        timstamps: false
    })

// define one-to-one relationship between Book and Student
// Student.hasOne(Book, { foreignKey: "studentId" });
// Book.belongsTo(Student, { foreignKey: "studentId" });


module.exports = Student