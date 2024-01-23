const db = require("../config/db.js")
const { DataTypes } = require("sequelize");
const Book = require("./Book.js");

const Author = db.define('Author', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
}, {
    tableName: 'authors',
    timestamps: true
});

module.exports = Author