const express = require("express");
const router = express.Router();
const {
    uploadSingleFile,
    deleteFile
} = require("../controllers/UploadFileController.js")


router.route('/').post(uploadSingleFile)
router.route("/:id").delete(deleteFile);


module.exports = router