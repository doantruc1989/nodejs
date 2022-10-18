const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express()

app.use(express.static('public'))

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'db1'
});

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


app.get('/', function(req,res) {
	res.sendFile(path.join(__dirname + 'index.html'))
});

app.post('/', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home')
				// response.send('Dang nhap thanh cong');
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

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.set('Content-Type', 'text/html');
		response.send('<p>Welcome back, </p>' + request.session.username + '<p>!</p>' + '<a href="http://127.0.0.1:3000/">logout</a>');
	} else {
		response.send('<p>Please login to view this page!</p>');
	}
	response.end();
});

app.listen(3000);