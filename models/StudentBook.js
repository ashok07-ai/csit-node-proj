const db = require("../config/db.js")
const Book = require("./Book.js")
const Student = require("./Student.js")

const StudentBook = db.define('StudentBook', {}, {tableName: 'student_books',timestamps: true})

Student.belongsToMany(Book, { through: StudentBook })
Book.belongsToMany(Student, { through: StudentBook })

module.exports = StudentBook