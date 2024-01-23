const express = require("express");
const router = express.Router();
const {
    getAllBook,
    createBook,
    updateBook,
    getBookById,
    deleteBook,
} = require("../controllers/BookController.js")

router.route('/').get(getAllBook)
router.route('/:id').get(getBookById)
router.route("/").post(createBook)
router.route("/:id").put(updateBook)
router.route("/:id").delete(deleteBook);

module.exports = router
