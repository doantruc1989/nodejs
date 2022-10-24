const path = require('path');

function route(app) {

    app.get('/', (req, res) => {
        var options = {
            root: path.join(__dirname)
        };
        var fileName = '/route/index.html';
        res.sendFile(fileName, options)
    });

    app.get('/post2', (req, res) => {
        var options = {
            root: path.join(__dirname)
        };
        var fileName = '/route/test.html';
        res.sendFile(fileName, options)
    });

    app.get('/login', (req, res) => {
        var options = {
            root: path.join(__dirname)
        };
        var fileName = '/route/login.html';
        if (req.cookies.username) {
            res.redirect('/profile');
        };
        res.sendFile(fileName, options);

    });

    app.get('/logout', function (req, res) {
        res.clearCookie('username')
        res.redirect('/')
    });

    app.get('/register', (req, res) => {
        var options = {
            root: path.join(__dirname)
        };
        var fileName = '/route/register.html';
        res.sendFile(fileName, options)
    });

    // app.get('/newPost')
}

module.exports = route;