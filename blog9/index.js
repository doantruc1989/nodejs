const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const path = require('path');
const session = require('express-session');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db1"
});
// con.connect(function(err) {

//   if (err) throw err;
  
//   let y = "SELECT * FROM users WHERE username = 'cuong'"
//   con.query(y, function (err, result) {
//     if (err) throw err;
//     console.log(result);
//   });
//   console.log("Connected!");
// });



//npm static
app.use(express.static('public'));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/');
				response.send('ok');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});


app.listen(3000)