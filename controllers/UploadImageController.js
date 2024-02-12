const path = require("path");
const multer = require("multer");
const UploadImage = require("../models/UplaodImage.js")

// multer configuration for handeling file uploads
const storage = multer.diskStorage({
    destination: (req, file, storeImageFunction) => {
        storeImageFunction(null, './assets');
    },
    filename: (req, file, fileInfoFunction) => {
        console.log(file)
        const fileName = `${Date.now()}-${file.originalname}`
        fileInfoFunction(null, fileName)
    }
});

const uploadImageData = multer({ storage }).single('filename')


// @desc POST Image
// @route DELETE /api/uploadImage
// @access public
const createSingleFileData = async (req, res) => {
    try {
        uploadImageData(req, res, async (err) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Error uploading image' });
            }

            const { title } = req.body;

            // Validate if title is present in the request
            if (!title) {
              return res.status(400).json({ error: 'Title is required' });
            }

            const newImage = await UploadImage.create({
              title,
              filename: req.file.filename
            });

            return res.status(201).json({ message: 'Image uploaded successfully!!', data: newImage });
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    createSingleFileData
}