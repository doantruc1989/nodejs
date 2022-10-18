const path = require('path');
const express = require('express')

const hdb= require('express-handlebars')
const app = express()
const port = 3000

app.engine('handlebars', hdb.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000);