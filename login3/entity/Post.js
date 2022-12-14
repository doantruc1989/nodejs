var EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Post", // Will use table name `post` as default behaviour.
    columns: {
        "id": {
            "primary": true,
            "type": "int",
            "generated": true,
        },
        "title": {
            "type": "varchar",
        },
        "tag": {
            "type": "text",
        },
    },
    relations: {
        categories: {
            target: "Category",
            type: "many-to-many",
            joinTable: true,
            cascade: true,
        },
    },
})