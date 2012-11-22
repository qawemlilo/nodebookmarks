
var express = require('express'),

    mongoose = require('mongoose'),
    MongoStore = require('connect-mongo')(express),
    
    config = require('./config'),
    
    userRoute = require('./routes/user'),
    bookmarkRoute = require('./routes/bookmark'),
    
    userModel = require('./models/user'),
    bookmarkModel = require('./models/bookmark'),
    
    dbSession = '',
    app;

app = module.exports = express.createServer();

// Configuration
app.configure(function() {
    app.set('views', __dirname + '/views');
    
    app.set('view engine', 'jade');
    
    app.use(express.bodyParser());
    
    app.use(express.cookieParser());
    
    app.use(express.methodOverride());
    
    app.use(express.session({
        secret: config.secret,
        //maxAge: new Date(Date.now() + 3600000),
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






/****************

    Generic API
    
*****************/

// Login
app.post('/users/login', function (req, res) { 
    userRoute.login(req, res, userModel); 
});



// Logout
app.get('/users/logout', function (req, res) {
    if (req.session.user) {
        req.session.destroy();
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



// Demo
app.get('/demo',  function (req, res) { 
    userRoute.demo(req, res, bookmarkModel); 
});









/**************

    User CRUD
    
***************/

// Register user - CREATE
app.post('/users', function (req, res) { 
    userRoute.register(req, res, userModel); 
});



// Get user information - READ
app.get('/users', function (req, res) {
    var user = req.session.user;

    if (user) {
        res.send({
            id: user._id, 
            password: '', 
            name: user.name, 
            email: user.email
        });
    }

    else {
        res.send(500, {
            model: {
                password: '', 
                name: '', 
                email: ''
            }, 
            
            msg: 'Your session has expired, please login'
        });
    }   
});



// Update user details - UPDATE
app.put('/users/:id', function (req, res) { 
    userRoute.update(req, res, userModel); 
});



// Delete user - DELETE
app.post('/users/delete', function (req, res) { 
    userRoute.remove(req, res, userModel); 
});











/***********************

    Bookmark CRUD
    
***********************/

// New bookmark - CREATE
app.post('/bookmarks', function (req, res) { 
    bookmarkRoute.add(req, res, bookmarkModel); 
});



// Get bookmarks - READ
app.get('/bookmarks', function (req, res) { 
    bookmarkRoute.getAll(req, res, bookmarkModel); 
});



// Update bookmark - UPDATE
app.put('/bookmarks/:id', function (req, res) { 
    bookmarkRoute.update(req, res, bookmarkModel); 
});



// Delete bookmark - DELETE
app.delete('/bookmarks/:id', function (req, res) { 
    bookmarkRoute.remove(req, res, bookmarkModel); 
});








/********************************

    Kick up the server!!!!!
    
*********************************/

app.listen(3003);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);


