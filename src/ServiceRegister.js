'use strict';

module.exports = function () {
    
    var http = require('http').createServer();
    var io = require('socket.io')(http);
    var apis = {};
    
    io.on('connection', function (socket) {
        
        socket.on('disconnect', function () {
            apis[socket.information.id] = false;
            console.log('  -> disconnected: ' + socket.information.id);
        });
        
        socket.on('information', function (data) {
            socket.information = data;
            apis[data.id] = {
                id: data.id,
                host: data.host,
                port: data.port
            };
            console.log('  -> registered: ' + socket.information.id);
        });
    
    });
    
    http.listen(3000, function () { 
        console.log('Register: 3000');
    });

    this.getConnection = function (id) {
        if (apis[id] === undefined)
        {
            throw new Error("Service not found: " + id);
        }
        if (apis[id] === false) {
            throw new Error("Service not available: " + id);
        }
        return apis[id];
    };

}