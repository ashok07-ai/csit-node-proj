const express = require("express");
const dotenv = require('dotenv');
const sequelize = require('./config/db.js');
const bodyParser = require('body-parser');
const Book = require("./models/Book.js");
const Student = require("./models/Student.js");
const StudentBook = require("./models/StudentBook.js");

const app = express();
const port = process.env.PORT || 5001;


app.get('/', (req, res) => {
    res.send("Welcome To Nodejs Backend Server")
})

// userRoute Middleware
app.use(bodyParser.json());
app.use('/api/user', require("./routes/userRoute.js"))
app.use('/api/student', require("./routes/studentRoute.js"))
app.use('/api/book', require("./routes/bookRoute.js"))
app.use('/api/author', require("./routes/authorRoute.js"))
app.use('/api/uploadImage', require("./routes/uploadImageRoute.js"))

// sequelize.sync({ force: true })

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
