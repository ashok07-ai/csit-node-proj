const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @desc Login
// @route POST /api/user/login
// @access public

const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userExist = await User.findOne({
            where: {
                email
            }
        })

        if (!userExist) {
            return res.status(404).json({ message: "Email not found!!" })
        }

        const isPasswordValid = await bcrypt.compare(password, userExist.password)

        if (isPasswordValid) {
            const token = jwt.sign({
                userId: userExist.id,
                email: userExist.email,
                mobileNumber: userExist.mobileNumber
            }, "secretKey", { expiresIn: 86400 })

            if (token) {
                return res.status(200).json({ message: "Loggedin successfully!!", accessToken: token })
            } else {
                return res.status(500).json({ message: "Internal server error" });
            }
        } else {
            return res.status(401).json({ message: "Invalid Credentials!!" })
        }


    } catch (error) {
        console.log("Error", error)
        return res.status(500).json({ message: "Internal Server Error!!" })
    }
}

module.exports = Login
