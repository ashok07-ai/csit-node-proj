const db = require("../config/db.js")
const { DataTypes } = require("sequelize");

const UploadImage = db.define('UploadImage', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'upload_images',
    timestamps: true
});

module.exports = UploadImage