"use strict";
exports.__esModule = true;
var express_1 = require("express");
var App = /** @class */ (function () {
    function App() {
        this.express = (0, express_1["default"])();
        this.mountRoutes();
    }
    App.prototype.mountRoutes = function () {
        var router = express_1["default"].Router();
        router.get('/', function (req, res) {
            res.json({
                message: 'Hello World!'
            });
        });
        this.express.use('/', router);
    };
    return App;
}());
exports["default"] = new App().express;
