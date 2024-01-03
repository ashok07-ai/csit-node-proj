const User = require("../models/User.js");
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize'); // Import Sequelize


// @desc Get User
// @route GET /api/user/
// @access public
const getAllUser = async (req, res) => {

}

// @desc Create User
// @route POST /api/user/
// @access public
const createUser = async (req, res) => {
    try {
        const existingEmail = await User.findOne({
            where: {
                email: req.body.email,
            }
        })

        if (existingEmail) {
            return res.status(400).json({ message: "Email already exist!!" })
        }

        const hashPassword = bcrypt.hashSync(req.body.password, 10);
        if (!hashPassword) {
            return res.status(500).json({ message: "Internal Server error!!" })
        }

        const newUser = await User.create({
            fullName: req.body.fullName,
            email: req.body.email,
            address: req.body.address,
            mobileNumber: req.body.mobileNumber,
            password: hashPassword,
            gender: req.body.gender,
            dateOfBirth: req.body.dateOfBirth
        })

        if (newUser) {
            return res.status(201).json({ message: "User Created Successfully!!" })
        } else {
            return res.status(500).json({ message: "Internal Server Error!!" })

        }
    } catch (error) {
        console.log("Error", error)
        return res.status(500).json({ message: "Internal Server Error!!" })

    }
};


// @desc Get User By Id
// @route GET /api/user/:id
// @access public
const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const userData = await User.findOne({
            where: { id: userId },
            attributes: { exclude: ['password'] }
        });

        if (userData) {
            res.status(200).json({ message: "User fetched successfully", data: userData });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong. Please try again' });
    }
}

// @desc Update User
// @route PUT /api/user/:id
// @access public
const updateUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const userExist = await User.findOne({
            where: { id: userId },
            attributes: { exclude: ['password'] }
        });

        const existingEmail = await User.findOne({
            where: {
                email: req.body.email,
                id: { [Sequelize.Op.not]: userId } // Exclude the current user from the check
            }
        });

        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        if (userExist) {
            const updatedData = await userExist.update({
                fullName: req.body.fullName,
                email: req.body.email,
                address: req.body.address,
                mobileNumber: req.body.mobileNumber,
                gender: req.body.gender,
                dateOfBirth: req.body.dateOfBirth
            });
            if (updatedData) {
                res.status(200).json({ message: "User updated successfully", data: updatedData });
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } else {
            res.status(404).json({ message: "User not found" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong. Please try again" });
    }
};




// @desc Delete User
// @route DELETE /api/user/:id
// @access public
const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findOne({
            where: { id: userId }
        });

        if (user) {
            await user.destroy();
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong. Please try again' });
    }

}

module.exports = {
    getAllUser,
    createUser,
    getUserById,
    updateUser,
    deleteUser
}