const multer = require("multer");
const UploadFileModel = require("../models/UploadFileModel");
const path = require('path');
const fs = require('fs/promises');

 // multer configuration for handling the filename and destination of files
 const storage = multer.diskStorage({
    destination: (req, file, storeFileFunction)=>{
        storeFileFunction(null, './assets')
    },

    filename: (req, file, fileInfoFunction)=>{
        const fileName = `${Date.now()}-${file.originalname}`;
        fileInfoFunction(null, fileName)
    }
});

// function for uploading single files
const fileUploadData = multer({storage}).single('filename')
const uploadSingleFile = async (req, res) =>{
   try {
    fileUploadData(req, res, async(error)=>{
        if(error){
            console.error(error);
            return res.status(500).json({error: "Error while uploading the file"})
        }
        const newFileData = await UploadFileModel.create({
            title: req.body.title,
            filename: req.file.filename
        })
    
        return res.status(201).json({message: "File uploaded successfully!!", data: newFileData})
    })
   
  
   } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal Server Error!!"})
   }
}


const deleteFile = async (req, res)=>{
    try {
        const fileId = req.params.id;
        const fileData = await UploadFileModel.findByPk(fileId)
        if(!fileId){
            return res.status(404).json({ error: 'File not found' });
        }

      
        if (fileData) {
             // Delete the file from the 'assets' folder
            const filePath = path.join('./assets', fileData.filename);
            await fs.unlink(filePath);
            
            // Delete the file record from the database
            await fileData.destroy();
            res.status(200).json({ message: 'file deleted successfully!!' });
        } else {
            res.status(404).json({ message: "FileData not found" })
        }
    } catch (error) {
        console.error("Error", error);
        res.status(500).json({ message: "Internal Server error!!" })
    }
}


module.exports = {
    uploadSingleFile,
    deleteFile
}