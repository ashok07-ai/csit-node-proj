const express = require("express");
const router = express.Router();
const {
    getAllStudent,
    createStudent,
    createStudnetBookMultipleRelation,
    getStudentById,
    updateStudent,
    deleteStudent,
} = require("../controllers/StudentController.js")


router.route('/').get(getAllStudent)
router.route('/:id').get(getStudentById)
router.route("/multipleStudentBookRelation").post(createStudnetBookMultipleRelation)
router.route("/").post(createStudent)
router.route("/:id").put(updateStudent)
router.route("/:id").delete(deleteStudent);

module.exports = router