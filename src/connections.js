const mysql2 = require('mysql2');
const dotenv = require('dotenv');
dotenv.config(); 

// ---------- Creating connection to SQL DB ----------------

const db = mysql2.createConnection(
    {
        host: process.env.HOST_NAME, 
        user: 'root',
        password: process.env.PASSWORD_KEY, 
        database: 'employee_cms'
    },
    console.log(`connected to employee_cms db`)
)

module.exports = db; 
