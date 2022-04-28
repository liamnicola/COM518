const mysql = require('mysql2');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ae1DB'
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

module.exports = con;