const db = require("../config/db.js")
const { DataTypes } = require("sequelize");
const Author = require("./Author.js");

const Book = db.define('Book', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.STRING,
        unique: true,
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
Book.belongsTo(Author, { foreignKey: 'authorId' });
Author.hasOne(Book, { foreignKey: 'authorId' });

module.exports = Book