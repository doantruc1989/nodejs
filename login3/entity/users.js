var EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "users",
    columns: {
        "id": {
            "primary": true,
            "type": "int",
            "generated": true
        },
        "name": {
            "type": "varchar"
        },
        "password": {
            "type": "varchar"
        },
        "username": {
            "type": "varchar",
            "unique": true
        },
        "avatar": {
            "type": "varchar"
        }
    }
})