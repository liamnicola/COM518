const express = require('express');
const mysql = require('mysql2');

const app = express();

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ae1'
});

con.connect(error => {
	if(error) {
		console.log(`Cannot connect to database: ${error}`);
		process.exit(1);	
	}
	else {
		console.log("Connected to database")
    }
});