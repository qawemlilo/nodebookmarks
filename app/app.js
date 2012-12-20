
var express = require('express'),
    request = require('request'),

    mongoose = require('mongoose'),
    MongoStore = require('connect-mongo')(express),
    
    config = require('./config'),
    
    userRoute = require('./routes/users'),
    bookmarkRoute = require('./routes/bookmarks'),
    
    userModel = require('./models/users'),
    bookmarkModel = require('./models/bookmarks'),
    
    Readability = require("readabilitySAX").Readability,
    Parser = require("htmlparser2").Parser,
    
    expressValidator = require('express-validator'),

    dbSession = '', app, inSession,loggedIn;

app = module.exports = express.createServer();

// Configuration
app.configure(function() {
    app.set('views', __dirname + '/views');
    
    app.set('view engine', 'jade');
    
    app.set( "jsonp callback", true );
    
    app.use(expressValidator);
    
    app.use(express.bodyParser());
    
    app.use(express.cookieParser());
    
    app.use(express.methodOverride());
    
    app.use(express.session({
        secret: config.secret,
        
        cookie: {
            maxAge: 365 * 24 * 60 * 60 * 1000
        },
        
        store: new MongoStore(config.db)
    }));
    
    app.use(app.router);
    
    app.use(express.static(__dirname + '/public'));
});






/*************************

    Database Connection
    
**************************/

dbSession = 'mongodb://' + config.db.host + '/' + config.db.db;
mongoose.createConnection(dbSession);










/****************

   Configuration
    
*****************/

app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function () {
    app.use(express.errorHandler()); 
});






















/*************************

    Middleware
    
**************************/


loggedIn = function (req, res, next) {
    if (!req.session.user) {
        res.send("Restricted access", 500);
    }
    else {
        next();
    }
};


var loadPage = function (url, fn) {
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            fn(false, body);            
        }
        else {
            fn(true, '')
        }
    });
};




inSession = function (req, res, next) {
    if (req.session.user) {
        res.redirect('/');
    }
    else {
        next();
    }
};














/****************

    Generic API
    
*****************/

// Login
app.post('/user/login', inSession, function (req, res) { 
    userRoute.login(req, res, userModel); 
});



// Logout
app.get('/user/logout', function (req, res) {
    if (req.session.user) {
        delete req.session.user;
    }
    res.redirect('/');
});



// Home
app.get('/',  function (req, res) {
    userRoute.index(req, res, bookmarkModel); 
});

// Home alias
app.get('/home', function (req, res) { 
    res.redirect('/'); 
});



// Website Terms and Conditions of Use
app.get('/privacy', function (req, res) { 
    res.render('privacy', {title: 'Website Terms and Conditions of Use', page: 'privacy', loggedIn: !!req.session.user});
});



// developers
app.get('/developers', function (req, res) { 
    res.render('developers', {title: 'Developers', page: 'developers', loggedIn: !!req.session.user});
});



// Demo
app.get('/demo',  function (req, res) { 
    userRoute.demo(req, res, bookmarkModel); 
});















/**************

    User CRUD
    
***************/

// Register user - CREATE
app.post('/user', inSession, function (req, res) { 
    userRoute.register(req, res, userModel); 
});



// Get user information - READ
app.get('/user', loggedIn, function (req, res) {
    var user = req.session.user;
    
    res.send({
        id: user._id, 
        password: '', 
        name: user.name, 
        email: user.email
    });        
});



// Update user details - UPDATE
app.put('/user/:id', loggedIn, function (req, res) { 
    userRoute.update(req, res, userModel); 
});



// Delete user - DELETE
app.post('/user/delete', loggedIn, function (req, res) { 
    userRoute.remove(req, res, userModel); 
});











/***********************

    Bookmark CRUD
    
***********************/

// New bookmark - CREATE
app.post('/bookmarks', loggedIn, function (req, res) { 
    bookmarkRoute.add(req, res, bookmarkModel); 
});

// New bookmark from a remote request - CREATE
app.get('/bookmark', function (req, res) { 
    bookmarkRoute.addRemote(req, res, bookmarkModel); 
});


// update bookmark from a remote request - UPDATE
app.get('/bookmark/:id', function (req, res) { 
    bookmarkRoute.updateRemote(req, res, bookmarkModel); 
});



// Get bookmarks - READ
app.get('/bookmarks', function (req, res) { 
    bookmarkRoute.get(req, res, bookmarkModel); 
});



// Update bookmark - UPDATE
app.put('/bookmarks/:id', loggedIn, function (req, res) { 
    bookmarkRoute.update(req, res, bookmarkModel); 
});



// Delete bookmark - DELETE
app.delete('/bookmarks/:id', loggedIn, function (req, res) { 
    bookmarkRoute.remove(req, res, bookmarkModel); 
});




app.get('/read/:id', function (req, res) {
    var readable = new Readability({}),
    parser = new Parser(readable, {});
    
    bookmarkModel.find(req.params.id, function (error, bookmark) {
        if(!error) {
            loadPage(bookmark.url, function (err, html) {
                if (!err) {
                    parser.write(html);
                    res.render('read', {page: 'read', href: bookmark.url, title: readable.getTitle(), loggedIn: !!req.session.user, articletitle: readable.getTitle(), article: readable.getHTML()});
                }
            });    
        }
    }); 
});


app.get('/reader', function (req, res) {
    var readable = new Readability({}),
    parser = new Parser(readable, {});
    
    var url = req.query.url;
    
    loadPage(url, function (err, html) {
        if (!err) {
            parser.write(html);
            res.render('read', {page: 'read', href: url, title: readable.getTitle(), loggedIn: !!req.session.user, articletitle: readable.getTitle(), article: readable.getHTML()});
        }
    });    
});






/********************************

    Kick up the server!!!!!
    
*********************************/

app.listen(3003);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);


