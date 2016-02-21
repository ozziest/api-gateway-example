var assert = require('assert');
var expect = require('expect.js');

describe('ServiceRegister', function() {
  
    describe('Instance', function () {
        it('should be created', function () {
        
            var ServiceRegister = require('../src/ServiceRegister.js');
            assert.equal(typeof ServiceRegister, "function");
            
            var register = new ServiceRegister();
            assert.equal(typeof register.getConnection, "function");
            
            
        });
    });

    describe('Service', function () {
        it('should be not found', function () {
        
            var ServiceRegister = require('../src/ServiceRegister.js');
            var register = new ServiceRegister();
            
            assert.throws(
                () => {
                    register.getConnection("users");
                },
                /Service not found/
            );
            
        });
    });

  
});