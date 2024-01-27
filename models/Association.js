const Student = require("../models/Student.js");
const Book = require("../models/Book.js")

// define One-to-One Relationship between Student and Book
Student.hasOne(Book, { foreignKey: "studentId" });
Book.belongsTo(Student, { foreignKey: "studentId" });

module.exports = {
    Student,
    Book
}