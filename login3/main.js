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
//         ['Thủ tướng Anh xin lỗi vì phạm sai lầm', 'Thủ tướng Liz Truss xin lỗi vì những sai lầm trong 6 tuần đầu nhiệm kỳ làm ảnh hưởng niềm tin của nhà đầu tư, nhưng quyết định không từ chức. Tôi chỉ muốn giúp đỡ người dân đang phải chịu hóa đơn năng lượng cao bằng chính sách cắt giảm thuế, nhưng chúng tôi đã đi quá nhanh và quá xa, Thủ tướng Anh Liz Truss nói trong cuộc phỏng vấn ngày 17/10, đề cập đến kế hoạch kích thích kinh tế đầy tham vọng của mình.'],
//         ['Chính phủ Pháp họp khẩn vì khủng hoảng nhiên liệu', 'Tổng thống Macron triệu tập cuộc họp với các bộ trưởng nhằm giải quyết tình trạng đình công lan rộng, đang tạo ra cuộc khủng hoảng năng lượng tại Pháp.'],
//         ['Mỹ nói Nga sắp diễn tập hạt nhân', 'Mỹ cho biết Nga chuẩn bị tiến hành diễn tập hạt nhân thường niên với nội dung bắn đạn thật, nhưng Washington chưa được Moskva thông báo theo thỏa thuận.'],
//         ['Đức quyết định giữ ba nhà máy điện hạt nhân', 'Đức sẽ để ba nhà máy điện hạt nhân còn lại vận hành đến tháng 4/2023 trong bối cảnh nước này đối mặt khủng hoảng năng lượng.']
//     ];
//     connection.query(sql, [values], function (err, result) {
//         if (err) throw err;
//         console.log("Number of records inserted: " + result.affectedRows);
//     });
// });

app.listen(3000);
