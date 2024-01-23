const express = require("express");
const router = express.Router();
const {
    getAllAuthor,
    createAuthor,
    getAuthorById,
    updateAuthor,
    deleteAuthor,
} = require("../controllers/AuthorController.js")

router.route('/').get(getAllAuthor)
router.route('/:id').get(getAuthorById)
router.route("/").post(createAuthor)
router.route("/:id").put(updateAuthor)
router.route("/:id").delete(deleteAuthor);

module.exports = router
