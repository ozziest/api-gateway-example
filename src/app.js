var ServiceRegister = require('./ServiceRegister.js');
var Gateway = require('./Gateway.js');

var application = new Gateway(new ServiceRegister());