// const db = require("../config/db.js")
// const { DataTypes } = require("sequelize");
// const Author = require("./Author.js");
// const Student = require("./Student.js");
// const Book = require("./Book.js");

// const StudentBook = db.define('StudentBook', {
//     bookId: {
//         type: DataTypes.INTEGER,
//         refrences: {
//             model: Book,
//             key: 'id'
//         }
//     },
//     studentId: {
//         type: DataTypes.INTEGER,
//         refrences: {
//             model: Student,
//             key: 'id'
//         }
//     },

// }, {
//     // tableName: 'student_books',
//     timestamps: true
// })

// Student.belongsToMany(Book, { through: StudentBook })
// Book.belongsToMany(Student, { through: StudentBook })

// module.exports = StudentBook