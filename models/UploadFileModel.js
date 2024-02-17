const db = require("../config/db.js")
const { DataTypes } = require("sequelize")

const UploadFileModel = db.define('UploadFileModel', {
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
        allowNull: false
    },
},
    {
        tableName: 'upload_images',
        timstamps: true
    })

module.exports = UploadFileModel