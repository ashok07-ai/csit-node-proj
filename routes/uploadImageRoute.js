const express = require("express");
const router = express.Router();
const {
    createSingleFileData
} = require("../controllers/UploadImageController.js")

router.route('/').post(createSingleFileData)

module.exports = router
