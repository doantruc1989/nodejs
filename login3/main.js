const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
var multer = require('multer');
var exphbs = require('express-handlebars');
var typeorm = require("typeorm");

const route = require('./routes');
// mySQL
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db1'
});

// typeorm
var dataSource = new typeorm.DataSource({
    type: "mysql",
    extra: "",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "db1",
    synchronize: true,
    // entities: [require("./entity/Post"), require("./entity/Category")],
    entities: [require("./entity/users.js"), require("./entity/Category"), require("./entity/draft.js")]
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
const { Like } = require('typeorm');
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

app.get('/category/thoisu', (req, res) => {
    dataSource
        .initialize()
        .then(function (connection) {
            return connection.getRepository("category");
        })
        .then(function (categoryRepository) {
            return categoryRepository.find({
                where: { tag: "%thoisu%" }
            })
        })
        .then(function (category) {
            // console.log("category: ", category);
            res.render('home', {
                category: category
            })
        });
});

app.get('/category/thethao', (req, res) => {
    dataSource
        .initialize()
        .then(function (connection) {
            return connection.getRepository("category");
        })
        .then(function (categoryRepository) {
            return categoryRepository.find({
                where: { tag: typeorm.ILike("%thethao%") }
            })
        })
        .then(function (category) {
            // console.log("category: ", category);
            res.render('home', {
                category: category
            })
        });
});

app.get('/category/quocte', (req, res) => {
    dataSource
        .initialize()
        .then(function (connection) {
            return connection.getRepository("category");
        })
        .then(function (categoryRepository) {
            return categoryRepository.find({
                where: { tag: "quocte" }
            })
        })
        .then(function (category) {
            // console.log("category: ", category);
            res.render('home', {
                category: category
            })
        });
});

app.get('/category/thoitiet', (req, res) => {
    dataSource
        .initialize()
        .then(function (connection) {
            return connection.getRepository("category");
        })
        .then(function (categoryRepository) {
            return categoryRepository.find({
                where: { tag: "thoitiet" }
            })
        })
        .then(function (category) {
            // console.log("category: ", category);
            res.render('home', {
                category: category
            })
        });
});




app.get('/category', (req, res) => {
    dataSource
        .initialize()
        .then(function (connection) {
            return connection.getRepository("category");
        })
        .then(function (categoryRepository) {
            return categoryRepository.find()
        })
        .then(function (category) {
            // console.log("category: ", category);
            res.render('home', {
                category: category
            })
        });
})

app.post('/post', (req, res) => {
    let title = req.body.title,
        uploadImage = req.body.path,
        contentText = req.body.contentText,
        postnewThread = req.body.postnewThread,
        draftWrite = req.body.draft,
        tagText = req.body.tag,
        loaddraft = req.body.loadDraft;

    if (postnewThread && req.cookies.username) {
        dataSource
            .initialize()
            .then(function (connection) {
                return connection.getRepository("category");
            })
            .then(function (categoryRepository) {
                var category = {
                    title: title,
                    content: contentText,
                    tag: tagText,

                    path: uploadImage,

                };
                return categoryRepository.save(category)
            })
            .then(function (categorys) {
                console.log("category has been successfully saved: ", categorys);
            })
        res.redirect('/category')

    } else if (draftWrite && req.cookies.username) {
        dataSource
            .initialize()
            .then(function (connection) {
                return connection.getRepository("draft");
            })
            .then(function (draftRepository) {
                var draft = {
                    title: title,
                    content: contentText,
                    tag: tagText,
                    path: uploadImage,
                    username: req.cookies.username
                };
                return draftRepository.save(draft)
            })
            .then(function (drafts) {
                console.log("category has been successfully saved: ", drafts);
            })
        res.send('save successfully.  <a href="/category"> click here to category page');

    } else if (loaddraft && req.cookies.username) {
        dataSource
            .initialize()
            .then(function (connection) {
                return connection.getRepository("draft");
            })
            .then(function (draftRepository) {
                return draftRepository.find({
                    where: { username: req.cookies.username }
                })
            })
            .then(function (drafts) {
                // console.log(drafts[0]);
                res.render('post', {
                    drafts: drafts
                })
            })

    } else {
        res.send('please login first.  <a href="/login"> click here to login');
    }
});





// dataSource
//     .initialize()
//     .then(function (connection) {
//         return connection.getRepository("users");
//     })
//     .then(function (usersRepository) {
//         return usersRepository.find()
//     })
//     .then(function (users) {
//         console.log("All students: ", users);
//         return;
//     })



// dataSource
//     .initialize()
//     .then(function (connection) {
//         return connection.getRepository("student");
//     })
//     .then(function (studentRepository) {
//         return studentRepository.find({
//             where: { id: 2 }
//         });
//     })
//     .then(function (students) {
//         console.log("All students: ", students);
//         return;
//     })


// dataSource
//     .initialize()
//     .then(function (connection) {
//         return connection.getRepository("category");
//     }).then(function (studentRepository) {
//         var student = {
//             id: "Student5",
//             title: 'a',
//             content: 34,
//             tag: 'xxx'
//         };
//         return studentRepository.save(student).then(function (savedStudent) {
//             console.log("Student has been successfully saved: ", savedStudent);
//             return studentRepository.find();
//         })
//             .then(function (students) {
//                 console.log("All students: ", students);
//                 return;
//             })
//             .catch(function (error) {
//                 console.log("Error: ", error); return;
//             })
//     })
//     .catch(function (error) {
//         console.log("Error: ", error)
//         return;
//     });

// connection.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "INSERT INTO category (title, content) VALUES ?";
//     var values = [
//         ['Th??? t?????ng Anh xin l???i v?? ph???m sai l???m', 'Th??? t?????ng Liz Truss xin l???i v?? nh???ng sai l???m trong 6 tu???n ?????u nhi???m k??? l??m ???nh h?????ng ni???m tin c???a nh?? ?????u t??, nh??ng quy???t ?????nh kh??ng t??? ch???c. T??i ch??? mu???n gi??p ????? ng?????i d??n ??ang ph???i ch???u h??a ????n n??ng l?????ng cao b???ng ch??nh s??ch c???t gi???m thu???, nh??ng ch??ng t??i ???? ??i qu?? nhanh v?? qu?? xa, Th??? t?????ng Anh Liz Truss n??i trong cu???c ph???ng v???n ng??y 17/10, ????? c???p ?????n k??? ho???ch k??ch th??ch kinh t??? ?????y tham v???ng c???a m??nh.'],
//         ['Ch??nh ph??? Ph??p h???p kh???n v?? kh???ng ho???ng nhi??n li???u', 'T???ng th???ng Macron tri???u t???p cu???c h???p v???i c??c b??? tr?????ng nh???m gi???i quy???t t??nh tr???ng ????nh c??ng lan r???ng, ??ang t???o ra cu???c kh???ng ho???ng n??ng l?????ng t???i Ph??p.'],
//         ['M??? n??i Nga s???p di???n t???p h???t nh??n', 'M??? cho bi???t Nga chu???n b??? ti???n h??nh di???n t???p h???t nh??n th?????ng ni??n v???i n???i dung b???n ?????n th???t, nh??ng Washington ch??a ???????c Moskva th??ng b??o theo th???a thu???n.'],
//         ['?????c quy???t ?????nh gi??? ba nh?? m??y ??i???n h???t nh??n', '?????c s??? ????? ba nh?? m??y ??i???n h???t nh??n c??n l???i v???n h??nh ?????n th??ng 4/2023 trong b???i c???nh n?????c n??y ?????i m???t kh???ng ho???ng n??ng l?????ng.']
//     ];
//     connection.query(sql, [values], function (err, result) {
//         if (err) throw err;
//         console.log("Number of records inserted: " + result.affectedRows);
//     });
// });

app.listen(3000);
