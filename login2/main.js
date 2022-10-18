const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
var multer = require('multer');
var exphbs = require('express-handlebars');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({ storage: storage });

var hbs = exphbs.create({ defaultLayout: 'main' });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

const cookieParser = require('cookie-parser');
const { ifError } = require('assert');
app.use(cookieParser());

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db1'
});

app.get('/', (req, res) => {
    var options = {
        root: path.join(__dirname)
    };
    var fileName = 'public/src/index.html';
    res.sendFile(fileName, options)
});
app.get('/login', (req, res) => {
    var options = {
        root: path.join(__dirname)
    };
    var fileName = 'public/src/login.html';
    if (req.cookies.username) {
        res.redirect('/profile');
    };
    res.sendFile(fileName, options);
    // res.clearCookie('username')
});

app.get('/profile', (req, res) => {
    if (!req.cookies.username) {
        res.redirect('/login');
    }
    res.render('home');

});

app.post('/logout', function (req, res) {
    // req.logout();
    res.clearCookie('username')
    res.redirect('/')
});

app.get('/register', (req, res) => {
    var options = {
        root: path.join(__dirname)
    };
    var fileName = 'public/src/register.html';
    res.sendFile(fileName, options)
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


app.post('/profile', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var rememberMe = req.body.rememberMe;

    if (username && password) {
        connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
            if (results.length > 0 && rememberMe) {
                // var content = `<img src="/img/{{post.image}}" height="100px" width="100px"/>`;
                res.cookie('username', username, { maxAge: 2592000000 });
                var home = {
                    name: 'username',
                    image: 'results[0].avatar'
                }
                res.render('home', {home : home});
                
            } else if (results.length > 0 && !rememberMe) {
                res.cookie('username', username);
                // var content = `<img src="/img/${results[0].avatar}" height="100px" width="100px"/>`;
                res.render('home', {
                    post: {
                        name: username,
                        image: results[0].avatar
                    }
                });
                res.redirect('/profile');
            } else {
                res.send('Incorrect Username and/or Password!');
            }
            res.end();
        });
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
});

app.post("/", upload.single('cuong'), uploadFiles);
function uploadFiles(req, res) {
    const { filename: image } = req.file;
    var avt = req.file.filename;
    var content2 = `<img src="./img/${avt}" height="120px" width="120px"/>`;
    fs.writeFileSync('./views/home.handlebars', content2);
    // res.render(content2);
    var sqlAvt = `UPDATE users SET avatar = "${avt}" WHERE username = "${req.cookies.username}"`;
    console.log(sqlAvt);
    let data = [false, 1];
    connection.query(sqlAvt, data, (error, result, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log('Rows affected:', result.affectedRows);
    });
    connection.end();
    res.redirect('/profile')
};
app.listen(3000);