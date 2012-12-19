var userroute = require('../routes/users'),
    bookmarkroute = require('../routes/users'),
    bookmarkmodel = require('../models/bookmarks'),
    usermodel = require('../models/users'),
    should = require('should'),
    app = require('../app');
    

describe('userroute', function() {
    describe('#index', function() {
        it('should be a function', function() {
            userroute.index.should.be.a["function"];
        });
    });
    
    describe('#demo', function() {
        it('should be a function', function() {
            userroute.demo.should.be.a["function"];
        });
    });
    
    describe('#update', function() {
        it('should be a function', function() {
            userroute.update.should.be.a["function"];
        });
    });
    
    describe('#remove', function() {
        it('should be a function', function() {
            userroute.remove.should.be.a["function"];
        });
    });
    
});