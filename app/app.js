
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

app.configure('production', function(){
    app.use(express.errorHandler()); 
});





/**************

    Get Methods
    
***************/


app.get('/',  function (req, res) {
    userRoute.index(req, res, bookmarkModel);
});

app.get('/home', function (req, res) {
    res.redirect('/');
});

app.get('/login', function (req, res) {
    res.redirect('/#login');
});

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

app.get('/bookmarks', function (req, res) {
    bookmarkRoute.bookmarks(req, res, bookmarkModel);
});





/*****************

    Post Methods
    
*****************/

app.post('/login', function (req, res) {   
   userRoute.login(req, res, userModel); 
});


app.post('/user', function (req, res) {
    var user = req.session.user;
    
    //User logged, update details
    if (user) {
        userRoute.update(req, res, userModel);
    }
    
    // User not logged, register the user
    else {
        userRoute.register(req, res, userModel);
    }
});


// New bookmark
app.post('/bookmarks', function (req, res) {
    bookmarkRoute.addbookmark(req, res, bookmarkModel);
});



/*****************

    Put Methods
    
*****************/
// Update bookmark

app.put('/bookmarks/:id', function (req, res) {
    bookmarkRoute.updatebookmark(req, res, bookmarkModel);
});



/*****************

    Delete
    
*****************/

// Delete bookmark
app.delete('/bookmarks/:id', function (req, res) {
    bookmarkRoute.deletebookmark(req, res, bookmarkModel);
});




app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);


