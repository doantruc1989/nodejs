var http = require('htpp');
http.creatServer(function (req,res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('helo');
}).listen(8080);