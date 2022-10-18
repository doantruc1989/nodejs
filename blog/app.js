const express = require('express')
const app = express()
const morgan = require('morgan')
const port = 3000

import { engine } from 'express-handlebars';
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(morgan('combined'))

app.get('/', (req, res) => {
  res.send('Hello Worldasdasd!')
})

app.listen(port, () => {
  console.log(`Example app listening ad http://localhost:${port}`)
})