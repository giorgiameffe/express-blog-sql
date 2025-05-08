// importare mysql
const mysql = require('mysql2');

// configurazioni MySql 
const connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'abcd',
    database: 'db_blog'
})

connection.connect((err) => {

    if (err) throw err;
    console.log('Connesso a MySql');
})

module.exports = connection;