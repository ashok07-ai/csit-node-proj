const express = require("express");
const router = express.Router();
const {
    getAllUser,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    changePassword
} = require("../controllers/UserController.js")

const Login = require("../controllers/LoginController.js");
const verifyToken = require("../middleware/verifyToken.js")

router.route('/').get(getAllUser)
router.route('/:id').get(getUserById)
router.route("/").post(createUser)
router.route("/:id").put(updateUser)
router.route("/:id").delete(deleteUser);
router.route("/login").post(Login);
router.route("/changePassword/:id").patch(changePassword)

module.exports = router