const Student = require("../models/Student.js");
const sequelize = require("../config/db.js");
const Sequelize = require("sequelize");
const Book = require("../models/Book.js");

const getAllStudent = async (req, res) => {
    try {
        const allStudentDetails = await Student.findAll({
            include: [
                {
                    model: Book
                }
            ]
        });
        if (allStudentDetails.length > 0) {
            return res.status(200).json({ message: "Student fetched successfuly!!", data: allStudentDetails })
        } else {
            return res.status(404).json({ message: "No details found!!" })
        }
    } catch (error) {
        console.log("Error", error)
        return res.status(500).json({ message: "Internal Server Error!!" })
    }
}

const createStudent = async (req, res) => {
    try {
        const existingEmail = await Student.findOne({
            where: {
                email: req.body.email,
            }
        })

        const allowedFacultyValues = ['CSIT', 'BCA']
        const enteredFacultyValue = (req.body.faculty).toUpperCase();
        if (!allowedFacultyValues.includes(enteredFacultyValue)) {
            return res.status(400).json({ messnge: "Invalid faculty. Must be CSIT or BCA" })

        }
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists!!" })
        }

        const newStudent = await Student.create({
            name: req.body.name,
            email: req.body.email,
            faculty: req.body.faculty,
            dateOfBirth: req.body.dateOfBirth
        })

        if (newStudent) {
            return res.status(201).json({ message: "Student Created Successfully!!", data: newStudent })
        } else {
            return res.status(500).json({ message: "Internal Server Error!!" })

        }
    } catch (error) {
        console.log("Error", error)
        return res.status(500).json({ message: "Internal Server Error!!" })
    }
};

const getStudentById = async (req, res) => {
    let studentId = req.params.id
    console.log(studentId)
    try {
        const studentData = await Student.findOne({
            where: {
                id: studentId,
            },
        })
        if (studentData) {
            return res.status(200).json({ message: "StudentId fetched..", data: studentData })
        } else {
            return res.status(500).json({ message: "Student not found" })
        }
    } catch (error) {
        console.log("Error", error)
        return res.status(500).json({ message: "Internal Server Error!!", error })
    }
}

const updateStudent = async (req, res) => {
    let studentId = req.params.id;
    try {
        const studentData = await Student.findOne({
            where: {
                id: studentId,
            }
        })

        const existingEmail = await Student.findOne({
            where: {
                email: req.body.email,
                id: { [Sequelize.Op.not]: studentId } // Exclude the current Student from the check
            }
        })

        if (existingEmail) {
            return res.status(400).json({ message: "Email already exist" })
        }

        if (studentData) {
            const updatedstudentData = await studentData.update({
                name: req.body.name,
                email: req.body.email,
                faculty: req.body.faculty,
                dateOfBirth: req.body.dateOfBirth
            })
            if (updatedstudentData) {
                return res.status(201).json({ message: "Student updated successfully!!" })
            } else {
                return res.status(500).json({ message: "Something went wrong" })
            }
        } else {
            return res.status(404).json({ message: "Student not found" })
        }


    } catch (error) {
        console.log("Error", error)
        return res.status(500).json({ message: "Internal Server Error!!" })
    }
};


const deleteStudent = async (req, res) => {
    let studentId = req.params.id;
    try {
        const studentData = await Student.findOne({
            where: {
                id: studentId,
            }
        })

        if (studentData) {
            await studentData.destroy();
            res.status(200).json({ message: 'Student deleted successfully!!' });
        } else {
            res.status(404).json({ message: "Student not found" })
        }
    } catch (error) {
        console.error("Error", error);
        res.status(500).json({ message: "Internal Server error!!" })
    }


}

module.exports = {
    getAllStudent,
    createStudent,
    getStudentById,
    updateStudent,
    deleteStudent
}