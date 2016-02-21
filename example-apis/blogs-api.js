var socket = require('socket.io-client')('http://localhost:3000');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var port = 6061;

socket.on('connect', function () {
    console.log('connected!');
    socket.emit('information', {
        id: 'blogs',
        host: '127.0.0.1',
        port: port
    });
});

socket.on('disconnect', function () {
    console.log('disconnect');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all('*', function (request, response) {
    response.json({blogs: true, url: request.url});
});

app.listen(port, function () {
    console.log('Blogs API: ' + port);
});
