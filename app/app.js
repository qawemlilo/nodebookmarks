
var express = require('express')
  , config = require('./config')
  , mongoose = require('mongoose') 
  , MongoStore = require('connect-mongo')(express)
  , userRoute = require('./routes/user')
  , bookmarkRoute = require('./routes/bookmark')
  , userModel = require('./models/user')
  , bookmarkModel = require('./models/bookmark')
  , dbSession = ''
  , app;

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

dbSession = 'mongodb://' + config.db.host + '/' + config.db.db;
mongoose.createConnection(dbSession);

app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function () {
    app.use(express.errorHandler()); 
});



/**************

    User Requests
    
***************/

// Home, public
app.get('/',  function (req, res) { userRoute.index(req, res, bookmarkModel); });

// Home, logged in
app.get('/home', function (req, res) { res.redirect('/'); });

// Get user information
app.get('/users', function (req, res) {
    var user = req.session.user;

    if (user) {
        res.send({id: user._id, password: '', name: user.name, email: user.email});
    }

    else {
        res.send(500, {model: {password: '', name: '', email: ''}, msg: 'Your session has expired, please login'});
    }   
});

// Register user
app.post('/users', function (req, res) { userRoute.register(req, res, userModel); });

// Login user
app.post('/users/login', function (req, res) { userRoute.login(req, res, userModel); });

// Logout user
app.get('/users/logout', function (req, res) {
    if (req.session.user) {
        req.session.destroy();
    }
    res.redirect('/');
});

// Update user details
app.put('/users/:id', function (req, res) { userRoute.update(req, res, userModel); });

// Delete user
app.post('/users/delete', function (req, res) { userRoute.remove(req, res, userModel); });



/***********************

    Bookmark Requests
    
***********************/

// Get bookmarks
app.get('/bookmarks', function (req, res) { bookmarkRoute.bookmarks(req, res, bookmarkModel); });

// New bookmark
app.post('/bookmarks', function (req, res) { bookmarkRoute.addbookmark(req, res, bookmarkModel); });

// Update bookmark
app.put('/bookmarks/:id', function (req, res) { bookmarkRoute.updatebookmark(req, res, bookmarkModel); });

// Delete bookmark
app.delete('/bookmarks/:id', function (req, res) { bookmarkRoute.deletebookmark(req, res, bookmarkModel); });



app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);


