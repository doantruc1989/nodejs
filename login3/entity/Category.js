var EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "category",
    columns: {
        "id": {
            "primary": true,
            "type": "int",
            "generated": true
        },
        "title": {
            "type": "text"
        },
        "content": {
            "type": "text"
        },
        "tag": {
            "type": "text"
        },
        "path": {
            "type": "text"
        },
        "time": {
            "type": "timestamp"
        }
    }
})