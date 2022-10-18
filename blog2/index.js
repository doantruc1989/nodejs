const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars');
const hbs = exphbs.create({defaultLayout: 'main'});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('home', {
    name: 'username',
    image: 'results[0].avatar'
})
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
});