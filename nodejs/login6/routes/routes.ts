import express, { Express, Request, Response } from 'express';
const router = express.Router();
import {getLogin, postLogin, getHome, getRegister, getProfile, changeAVT, getAVT, getCategory, postPage, postCategory, toCategory } from '../controller/controller';
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
router.get('/', getHome);

export = router;