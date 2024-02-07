const db = require("../config/db.js")
const { DataTypes } = require("sequelize");
const Author = require("./Author.js");

const Book = db.define('Book', {
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
    price: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false

    },

}, {
    tableName: 'books',
    timestamps: true
})


module.exports = Book