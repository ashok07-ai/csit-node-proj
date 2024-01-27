const Book = require("../models/Book.js"); // Import Sequelize
const sequelize = require("../config/db.js");
const Author = require("../models/Author.js");
const Student = require("../models/Student.js");


// @desc Get Book
// @route GET /api/book/
// @access public
const getAllBook = async (req, res) => {
    try {
        const allBookDetails = await Book.findAll(
            {
                include: [
                    {
                        model: Student
                    },
                ],
            }
        );
        if (allBookDetails.length > 0) {
            return res.status(200).json({ message: "Book fetched successfully!!", data: allBookDetails })
        } else {
            return res.status(500).json({ message: "Empty Data / Data cannot be fetched!!" })
        }
    } catch (error) {
        console.log("Error", error)
        return res.status(500).json({ message: "Internal Server Error!!" })
    }
}

// @desc Create Book
// @route POST /api/book/
// @access public
const createBook = async (req, res) => {
    try {
        const { name, price, description, studentId } = req.body;

        // Check if the author exists
        const student = await Student.findByPk(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Create a new book and associate it with the student
        const book = await Book.create({
            name,
            price,
            description,
            studentId,
        });

        res.status(201).json({ message: 'Book created successfully', data: book.toJSON() });
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// @desc Get Book By Id
// @route GET /api/book/:id
// @access public
const getBookById = async (req, res) => {
    let bookId = req.params.id
    try {
        const bookData = await Book.findOne({
            where: {
                id: bookId,
            },
            include: Student
        })
        if (bookData) {
            return res.status(200).json({ message: "Book fetched..", data: bookData })
        } else {
            return res.status(500).json({ message: "Book not found" })
        }
    } catch (error) {
        console.log("Error", error)
        return res.status(500).json({ message: "Internal Server Error!!" })
    }
}

// @desc Update Book
// @route PUT /api/book/:id
// @access public
const updateBook = async (req, res) => {
    let bookId = req.params.id;
    try {
        const bookData = await Book.findOne({
            where: {
                id: bookId,
            }
        })

        if (bookData) {
            const updatedBookData = await bookData.update({
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
            })
            if (updatedBookData) {
                return res.status(200).json({ message: "Book updated successfully!!" })
            } else {
                return res.status(500).json({ message: "Something went wrong" })
            }
        } else {
            return res.status(404).json({ message: "Book not found" })
        }


    } catch (error) {
        console.log("Error", error)
        return res.status(500).json({ message: "Internal Server Error!!" })
    }
};


// @desc Delete Book
// @route DELETE /api/book/:id
// @access public
const deleteBook = async (req, res) => {
    let bookId = req.params.id;
    try {
        const bookData = await Book.findOne({
            where: {
                id: bookId,
            }
        })

        if (bookData) {
            await bookData.destroy();
            res.status(200).json({ message: 'Book deleted successfully!!' });
        } else {
            res.status(404).json({ message: "Book not found" })
        }
    } catch (error) {
        console.error("Error", error);
        res.status(500).json({ message: "Internal Server error!!" })
    }
}

module.exports = {
    getAllBook,
    createBook,
    getBookById,
    updateBook,
    deleteBook,
}