
/**
 * Module dependencies.
 */

var express = require('express')
  , config = require('./config')
  , mongoose = require('mongoose') 
  , MongoStore = require('connect-mongo')(express)
  , routes = require('./routes')
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
        maxAge: new Date(Date.now() + 3600000),
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

app.configure('production', function(){
    app.use(express.errorHandler()); 
});





/**************

    Get Routes
    
***************/

/*
    Global Get Requests
*/

app.get('/',  function (req, res) {
    routes.index(req, res, bookmarkModel);
});

app.get('/home', function (req, res) {
    res.redirect('/');
});

app.get('/login', function (req, res) {
    res.redirect('/#login');
});


/*
    User model 'get' requests
*/

app.get('/user', function (req, res) {
    var user = req.session.user;

    
    //User logged in, backbone fetch request
    if (user) {
        res.send({password: '', name: user.name, email: user.email});
    }
    
    // User session has expired 
    else {
        res.send(500, {model: {password: '', name: '', email: ''}, msg: 'Your session has expired, please login'});
    }   
});


app.get('/logout', function (req, res) {
    if (req.session.user) {
       req.session.destroy();
    }
    
    res.redirect('/');
});


/*
    Bookmark model 'get' requests
*/

app.get('/bookmarks', function (req, res) {
    routes.bookmarks(req, res, bookmarkModel);
});





/*****************

    Post Routes
    
*****************/

/*
        User model 'post' requests
*/

app.post('/login', function (req, res) {   
   routes.login(req, res, userModel); 
});


app.post('/user', function (req, res) {
    var user = req.session.user;
    
    //User logged, update details
    if (user) {
        routes.update(req, res, userModel);
    }
    
    // User not logged, register the user
    else {
        routes.register(req, res, userModel);
    }
});


/*
        Bookmark model requests
*/

// New bookmark
app.post('/bookmarks/add', function (req, res) {
    routes.addbookmark(req, res, bookmarkModel);
});



/*****************

    Put Routes
    
*****************/

// Update bookmark
app.put('/bookmarks/:id', function (req, res) {
    routes.updatebookmark(req, res, bookmarkModel);
});



/*****************

    Delete Routes
    
*****************/

// Delete bookmark
app.delete('/bookmarks/:id', function (req, res) {
    routes.deletebookmark(req, res, bookmarkModel);
});




app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);


