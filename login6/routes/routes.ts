import express, { Express, Request, Response } from 'express';
const router = express.Router();
<<<<<<< HEAD
import { getLogin, postLogin, getHome, getRegister, getProfile, changeAVT, getAVT, getCategory, postPage, postCategory, toCategory, createRegister } from '../controller/controller';
=======
import {getLogin, postLogin, getHome, getRegister, getProfile, changeAVT, getAVT, getCategory, postPage, postCategory, toCategory } from '../controller/controller';
>>>>>>> 7ae84adc41d199bc6f1c5ba9c1f415cec5b5d7d7
import multer from 'multer';
import * as path from 'path';

//multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/image');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
<<<<<<< HEAD
});
var upload = multer({ storage: storage });

router.get('/login', getLogin);
router.post('/login', postLogin);
router.get('/register', getRegister);
router.post('/register', createRegister);
router.get('/profile/changeAVT', getAVT);
router.post('/profile/changeAVT', upload.single('avatar'), changeAVT);
router.get('/profile', getProfile);
router.get('/category', getCategory)
router.get('/category/:slud', toCategory);
router.get('/pos', postPage);
router.post('/post', postCategory);
=======
  });
  var upload = multer({ storage: storage });

router.get('/login', getLogin);
router.post('/login', postLogin)
router.get('/register', getRegister);
router.get('/profile/changeAVT', getAVT)
router.post('/profile/changeAVT', upload.single('avatar'), changeAVT)
router.get('/profile', getProfile);
router.get('/category', getCategory)
router.get('/category/:slud', toCategory)
router.get('/pos', postPage)
router.post('/post', postCategory)
>>>>>>> 7ae84adc41d199bc6f1c5ba9c1f415cec5b5d7d7
router.get('/', getHome);

export = router;