var app = require('../app'),
    userroute = require('../routes/users'),
    bookmarkroute = require('../routes/users'),
    bookmarkmodel = require('../models/bookmarks'),
    usermodel = require('../models/users'),
    should = require('should');
    

var request = {
    session: {
        user: {
        
        }
    },
    
    query: {
       
    }
};

var response = {
    viewName: ""
    , data : {}
    , render: function(view, viewData) {
        this.viewName = view;
        this.data = viewData;
    }
};

describe('userroute', function() {
    describe('#index', function() {
        it('should be a function', function() {
            userroute.index.should.be.a["function"];
        });
        
        it('load default', function(request, response) {
            userroute.index();
            
            response.viewName.should.equal("index");
        });
    });
});