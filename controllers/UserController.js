const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const db = require("../config/db.js")

// @desc Get User
// @route GET /api/user/
// @access public
const getAllUser = async (req, res) => {
    try {
        const allUserDetails = await User.findAll({
            attributes: {
                exclude: ['password']
            }
        });

        if (allUserDetails.length > 0) {
            res.status(200).json({ message: "User fetched successfully!!", data: allUserDetails });
        } else {
            res.status(404).json({ message: "No data found!!" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error!!" });
    }

}

// @desc Create User
// @route POST /api/user/
// @access public
const createUser = async (req, res) => {
    try {
        const existingUser = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already exists",
            });
        }

        const hashedPassword = bcrypt.hashSync(req.body.password, 10);

        if (!hashedPassword) {
            return res.status(500).json({ message: "Internal server error - Unable to hash password" });
        }

        const allowedGenders = ["male", "female", "others"]
        const genderType = (req.body.gender).toLowerCase();
        if (!allowedGenders.includes(genderType)) {
            return res.status(400).json({ message: "Invalid gender. Must be 'male', 'female', or 'others'" });

        }

        const newUser = await User.create({
            fullName: req.body.fullName,
            email: req.body.email,
            address: req.body.address,
            mobileNumber: req.body.mobileNumber,
            password: hashedPassword,
            // gender: req.body.gender,
            gender: genderType,
            dateOfBirth: req.body.dateOfBirth,
        });

        if (newUser) {
            return res.status(201).json({ message: "User created successfully!!" });
        } else {
            return res.status(500).json({ message: "Internal server error - Unable to create user" });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


// @desc Get User By Id
// @route GET /api/user/:id
// @access public
const getUserById = async (req, res) => {

}

// @desc Update User
// @route PUT /api/user/:id
// @access public
const updateUser = async (req, res) => {

}


// @desc Delete User
// @route DELETE /api/user/:id
// @access public
const deleteUser = async (req, res) => {


}

module.exports = {
    getAllUser,
    createUser,
    getUserById,
    updateUser,
    deleteUser
}