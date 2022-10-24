import express, { Express, Request, Response } from 'express';
const app: Express = express();
const port = 3000;
import * as bodyParser from 'body-parser';
<<<<<<< HEAD
import router from './routes/routes';
=======
import  router  from './routes/routes';
>>>>>>> 7ae84adc41d199bc6f1c5ba9c1f415cec5b5d7d7
app.use(bodyParser.json());
import "reflect-metadata";
import * as path from 'path';
import { engine } from 'express-handlebars';
import cookieParser from "cookie-parser";

app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, './src/views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json())

app.use(router);
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});


