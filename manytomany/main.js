var typeorm = require("typeorm")

var dataSource = new typeorm.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "db2",
    synchronize: true,
    entities: [require("./entity/Post"), require("./entity/Category")],
})

dataSource
    .initialize()
    .then(function () {
        var category1 = {
            name: "TypeScript",
        }
        var category2 = {
            name: "Programming",
        }

        var post = {
            title: "Control flow based type analysis",
            text: "TypeScript 2.0 implements a control flow-based type analysis for local variables and parameters.",
            categories: [category1, category2],
        }

        var postRepository = dataSource.getRepository("Post")
        postRepository
            .save(post)
            .then(function (savedPost) {
                console.log("Post has been saved: ", savedPost)
                console.log("Now lets load all posts: ")

                return postRepository.find()
            })
            .then(function (allPosts) {
                console.log("All posts: ", allPosts)
            })
    })
    .catch(function (error) {
        console.log("Error: ", error)
    })