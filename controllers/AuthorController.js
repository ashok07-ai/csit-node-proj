const Author = require("../models/Author.js");
const sequelize = require("../config/db.js");
const Book = require("../models/Book.js");

const getAllAuthor = async (req, res) => {
    try {
        const allAuthorDetails = await Author.findAll({ include: Book });
        if (allAuthorDetails.length > 0) {
            return res.status(200).json({ message: "Author fetched successfuly!!", data: allAuthorDetails })
        } else {
            return res.status(404).json({ message: "No details found!!" })
        }
    } catch (error) {
        console.log("Error", error)
        return res.status(500).json({ message: "Internal Server Error!!" })
    }
}

const createAuthor = async (req, res) => {
    const { name, address } = req.body;
    try {
        const newAuthor = await Author.create({
            name: name,
            address: address,
        })

        if (newAuthor) {
            return res.status(201).json({ message: "Author Created Successfully!!", data: newAuthor })
        } else {
            return res.status(500).json({ message: "Internal Server Error!!" })

        }
    } catch (error) {
        console.log("Error", error)
        return res.status(500).json({ message: "Internal Server Error!!" })
    }
};

const getAuthorById = async (req, res) => {
    let authorId = req.params.id
    console.log(authorId)
    try {
        const authorData = await Author.findOne({
            where: {
                id: authorId,
            },
        })
        if (authorData) {
            return res.status(200).json({ message: "Author fetched..", data: authorData })
        } else {
            return res.status(500).json({ message: "Author not found" })
        }
    } catch (error) {
        console.log("Error", error)
        return res.status(500).json({ message: "Internal Server Error!!", error })
    }
}

const updateAuthor = async (req, res) => {
    let authorId = req.params.id;
    try {
        const authorData = await Author.findOne()



        if (authorData) {
            const updatedAuthorData = await authorData.update({
                name: req.body.name,
                address: req.body.address,
            })
            if (updatedAuthorData) {
                return res.status(201).json({ message: "Author updated successfully!!" })
            } else {
                return res.status(500).json({ message: "Something went wrong" })
            }
        } else {
            return res.status(404).json({ message: "Author not found" })
        }


    } catch (error) {
        console.log("Error", error)
        return res.status(500).json({ message: "Internal Server Error!!" })
    }
};


const deleteAuthor = async (req, res) => {
    let authorId = req.params.id;
    try {
        const authorData = await Author.findOne({
            where: {
                id: authorId,
            }
        })

        if (authorData) {
            await authorData.destroy();
            res.status(200).json({ message: 'Author deleted successfully!!' });
        } else {
            res.status(404).json({ message: "Author not found" })
        }
    } catch (error) {
        console.error("Error", error);
        res.status(500).json({ message: "Internal Server error!!" })
    }


}

module.exports = {
    getAllAuthor,
    createAuthor,
    getAuthorById,
    updateAuthor,
    deleteAuthor
}