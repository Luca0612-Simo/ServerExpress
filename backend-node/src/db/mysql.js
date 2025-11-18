const mysql = require('promise-mysql')
require('dotenv').config()

const dbconfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
}

let activeConnection = null;

async function connectDB() {
    try {
        activeConnection = await mysql.createConnection(dbconfig);
        console.log("Conexión exitosa.");
    } catch (err) {
        console.error("ERROR: No se pudo conectar a la DB.", err.message);
        throw err; 
    }
}

connectDB(); 

function getConnection(){
    if (!activeConnection) {
        throw new Error("Conexión a la base de datos no disponible.");
    }
    return activeConnection;
}

module.exports = getConnection;