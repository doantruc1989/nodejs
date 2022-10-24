import { Request, Response, NextFunction } from "express";
import { myDataSource, connection } from "../src/connect";
import { users } from "../src/entity/users";
import { post } from "../src/entity/post";
import { category } from "../src/entity/category";
import { draft } from "../src/entity/draft";
import "reflect-metadata";
import * as path from "path";

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

export function getLogin(req: Request, res: Response, next: NextFunction) {
  res.render("login");
}

export function postLogin(req: Request, res: Response, next: NextFunction) {
  var username = req.body.username;
  var password = req.body.password;
  var rememberMe = req.body.rememberMe;
  if (username && password) {
    connection.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password],
      function (error, results, fields) {
        res.cookie("username", username, {
          maxAge: rememberMe ? 2592000000 : undefined,
        });
<<<<<<< HEAD
        res.redirect('/profile')
        // res.send(
        //   'loggin successfully <br><a href="http://127.0.0.1:3000">back to homepage</a>'
        // );
=======
        res.send(
          'loggin successfully <br><a href="http://127.0.0.1:3000">back to homepage</a>'
        );
>>>>>>> 7ae84adc41d199bc6f1c5ba9c1f415cec5b5d7d7
      }
    );
  } else {
    res.send(
      "Incorrect Username and/or Password! <br><a href='http://127.0.0.1:3000'>back to homepage</a>"
    );
  }
  connection.end();
}

export function getRegister(req: Request, res: Response, next: NextFunction) {
<<<<<<< HEAD
  res.clearCookie("username");
  var options = {
    root: path.join(__dirname),
  };
  var fileName = "/html/register.html";
  res.sendFile(fileName, options);
  // res.send(
  //   'đây là register page <a href="http://127.0.0.1:3000">back to homepage</a>!'
  // );
}

export async function createRegister(req: Request, res: Response, next: NextFunction) {
  const newUser = {
    password: req.body.psw,
    username: req.body.Username,
    avatar: "1666357278165.png"
  }
  if (req.body.psw !== req.body.pswrepeat) {
    res.send('Password do not match <a href="http://127.0.0.1:3000/register">back.</a>')
  }
  const user = await myDataSource.getRepository(users).save(newUser)
  res.send('register successfully <a href="http://127.0.0.1:3000">back to home page</a><br><a href="http://127.0.0.1:3000/profile">to profile</a>')
=======
  res.send(
    'đây là register page <a href="http://127.0.0.1:3000">back to homepage</a>!'
  );
>>>>>>> 7ae84adc41d199bc6f1c5ba9c1f415cec5b5d7d7
}

export async function getProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.cookies.username) {
    res.redirect("/login");
  }
  const user = await myDataSource.getRepository(users).find({
    where: { username: req.cookies.username },
  });
  res.render("profile", {
    name: req.cookies.username,
    img: user[0].avatar,
  });
}

export function getAVT(req: Request, res: Response, next: NextFunction) {
  res.render("changeAVT");
}

export async function changeAVT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let avt = req.file?.filename;
  await myDataSource
    .createQueryBuilder()
    .update(users)
    .set({ avatar: avt })
    .where({ username: req.cookies.username })
    .execute();
  res.redirect("/profile");
}

export async function getCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.cookies.username) {
    res.redirect("/login");
  }
  const user = await myDataSource.getRepository(post).find();
  res.render("category", { post: user });
}

export function postPage(req: Request, res: Response, next: NextFunction) {
  var options = {
    root: path.join(__dirname),
  };
  var fileName = "/html/postx.html";
  res.sendFile(fileName, options);
}

export async function postCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let title = req.body.title,
    image = req.body.path,
    contentText = req.body.contentText,
<<<<<<< HEAD
    contentTextFull = req.body.contentTextFull,
=======
>>>>>>> 7ae84adc41d199bc6f1c5ba9c1f415cec5b5d7d7
    postnewThread = req.body.postnewThread,
    saveWrite = req.body.draft,
    loadDraft = req.body.loadDraft;
  let newPost = {
    title: title,
    path: image,
    content: contentText,
<<<<<<< HEAD
    contentFull: contentTextFull,
=======
>>>>>>> 7ae84adc41d199bc6f1c5ba9c1f415cec5b5d7d7
    username: req.cookies.username,
  };
  if (postnewThread && req.cookies.username) {
    await myDataSource.getRepository("post").save(newPost);
    res.send(
      'Post successfully! <a href="http://127.0.0.1:3000/category">back to category</a>'
    );
  } else if (saveWrite && req.cookies.username) {
    await myDataSource.getRepository("draft").save(newPost);
    res.send(
      'Save successfully! <a href="http://127.0.0.1:3000/category">back to category</a>'
    );
  } else if (loadDraft && req.cookies.username) {
    const load = await myDataSource.getRepository("draft").find({
      where: { username: req.cookies.username },
    });
    res.render("post", { load: load });
  }
}

export async function toCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.params.slud == "thethao") {
    const categories = await myDataSource
      .getRepository(category)
      .createQueryBuilder("category")
      .leftJoinAndSelect("category.posts", "post")
      .where("post.categoriesId = :categoriesId", { categoriesId: 3 })
      .getMany();
    let posts = categories[0].posts;
    res.render("categorybytag", {
      posts: posts,
    });
<<<<<<< HEAD
=======
    console.log(categories)
>>>>>>> 7ae84adc41d199bc6f1c5ba9c1f415cec5b5d7d7
  } else if (req.params.slud == "quocte") {
    const categories = await myDataSource
      .getRepository(category)
      .createQueryBuilder("category")
      .leftJoinAndSelect("category.posts", "post")
      .where("post.categoriesId = :categoriesId", { categoriesId: 2 })
      .getMany();
    let posts = categories[0].posts;
    res.render("categorybytag", {
      posts: posts,
    });
  } else if (req.params.slud == "thoisu") {
    const categories = await myDataSource
      .getRepository(category)
      .createQueryBuilder("category")
      .leftJoinAndSelect("category.posts", "post")
      .where("post.categoriesId = :categoriesId", { categoriesId: 4 })
      .getMany();
    let posts = categories[0].posts;
    res.render("categorybytag", {
      posts: posts,
    });
  } else if (req.params.slud == "thoitiet") {
    const categories = await myDataSource
      .getRepository(category)
      .createQueryBuilder("category")
      .leftJoinAndSelect("category.posts", "post")
      .where("post.categoriesId = :categoriesId", { categoriesId: 1 })
      .getMany();
    let posts = categories[0].posts;
    res.render("categorybytag", {
      posts: posts,
    });
  }
<<<<<<< HEAD
  const post = await myDataSource.getRepository("post").find({
    where: { id: req.params.slud },
  });
  res.render('categoryDetail', {
    post: post,
  })

=======
>>>>>>> 7ae84adc41d199bc6f1c5ba9c1f415cec5b5d7d7
}

export function getHome(req: Request, res: Response, next: NextFunction) {
  res.render("home");
}
