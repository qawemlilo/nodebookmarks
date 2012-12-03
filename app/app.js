
var express = require('express'),

    mongoose = require('mongoose'),
    MongoStore = require('connect-mongo')(express),
    
    config = require('./config'),
    
    userRoute = require('./routes/user'),
    bookmarkRoute = require('./routes/bookmark'),
    
    userModel = require('./models/user'),
    bookmarkModel = require('./models/bookmark'),
    
    expressValidator = require('express-validator'),
    
    dbSession = '',
    app, 
    
    loggedIn;

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
        res.send(500);
    }
    else {
        next();
    }
};














/****************

    Generic API
    
*****************/

// Login
app.post('/user/login', function (req, res) { 
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
    res.render('privacy', {title: 'Website Terms and Conditions of Use', page: 'privacy', loggedIn: false});
});



// developers
app.get('/developers', function (req, res) { 
    res.render('developers', {title: 'Developers', page: 'developers', loggedIn: false});
});



// Demo
app.get('/demo',  function (req, res) { 
    userRoute.demo(req, res, bookmarkModel); 
});















/**************

    User CRUD
    
***************/

// Register user - CREATE
app.post('/user', function (req, res) { 
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








/********************************

    Kick up the server!!!!!
    
*********************************/

app.listen(3003);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);


