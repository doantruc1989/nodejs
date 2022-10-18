const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
var multer = require('multer');
var exphbs = require('express-handlebars');

const route = require('./routes');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db1'
});

//multer upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './client/public/image');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({ storage: storage });

//handlerbars
const hbs = exphbs.create({ defaultLayout: 'main' });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, './client/views/'));

//cookie parser
const cookieParser = require('cookie-parser');
const { ifError } = require('assert');
app.use(cookieParser());

//bodyParser + static
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client/public'));

// routes
route(app);

app.get('/profile', (req, res) => {
    if (!req.cookies.username) {
        res.redirect('/login');
    } else {
        var sqlAvt = `SELECT * FROM users WHERE username = "${req.cookies.username}"`;
        let data = [false, 1];
        connection.query(sqlAvt, data, (error, result, fields) => {
            if (error) {
                return console.error(error.message);
            }
            res.render('home', {
                name: req.cookies.username,
                img: result[0].avatar
            });
        });
        connection.end();
    }
});

app.post('/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var rememberMe = req.body.rememberMe;
    if (username && password) {
        connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
            res.cookie('username', username, { maxAge: rememberMe ? 2592000000 : undefined });
            var imagePath = results[0].avatar;
            res.render('home', {
                name: username,
                img: imagePath
            });
        });
    } else {
        res.send('Incorrect Username and/or Password!');
        res.end();
    };
});

app.post("/", upload.single('cuong'), uploadFiles);
function uploadFiles(req, res) {
    const { filename: image } = req.file;
    var avt = req.file.filename;
    res.render('home', {
        name: req.cookies.username,
        img: avt
    });

    var sqlAvt = `UPDATE users SET avatar = "${avt}" WHERE username = "${req.cookies.username}"`;
    let data = [false, 1];
    connection.query(sqlAvt, data, (error, result, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log('Rows affected:', result.affectedRows);
    });
    connection.end();
};

app.post('/post', (req, res) => {
    console.log(req.body)

    res.render('home', {
        title: req.body.title,
        uploadImage: req.body.uploadImage,
        contentText: req.body.contentText,
        postnewThread: req.body.postnewThread,
        draft: req.body.draft
    })
});

app.listen(3000);
