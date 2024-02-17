# Project Database Configuration

## Getting Started
To use this database configuration in your Node.js project, follow the steps below:

### 1. Install Dependencies
npm install

### 2. Database Configuration
const { Sequelize } = require("sequelize")

const sequelize = new Sequelize('database_name', 'username', 'password', {
    host: 'localhost',
    dialect: "mysql"
});

module.exports = sequelize

Replace the following placeholders:

'database_name' with the name of your MySQL database.
'username' with your MySQL username.
'password' with your MySQL password.

### 2. Start the project
npm run dev