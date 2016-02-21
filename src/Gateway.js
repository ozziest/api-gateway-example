'use strict';

module.exports = function (registerManager) {
    
    var express = require('express');
    var app = express();
    var register = registerManager;
    var http = require('http');
    var bodyParser = require('body-parser');
    var querystring = require('querystring');
    
    var solve = function (url) {
        var parts = url.split("/");
        var id = parts[1];
        var api = register.getConnection(id)
        return {
            hostname: api.host,
            localAddress: api.host,
            path: url.substr(1).replace(id, ""),
            port: api.port
        };
    };
    
    var redirect = function (options, request, callback) {
        var data = querystring.stringify(request.body);
        options.method = request.method;
        options.headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': data.length,
            'Authorization': request.headers.authorization
        };
        var redirection = http.request(options, function (response) {
            var str = '';            
            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                callback(JSON.parse(str));
            });
        });
        
        redirection.write(data)
        redirection.end();
    }
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    
    app.all('*', function (request, response) {
        try {
            var api = solve(request.url);
            redirect(api, request, function (result) {
                response.json(result);
            });
        }
        catch (exception) {
            response.status(400).json({
                message: exception.message
            });
        }
    });
    
    app.listen(9090, function () {
        console.log('Gateway: 9090');
    });

}