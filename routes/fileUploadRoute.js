const express = require("express");
const router = express.Router();
const {
    uploadSingleFile,
    uploadMultipleFile,
    deleteFile
} = require("../controllers/UploadFileController.js")


router.route('/').post(uploadSingleFile)
router.route('/multiple').post(uploadMultipleFile)
router.route("/:id").delete(deleteFile);


module.exports = router