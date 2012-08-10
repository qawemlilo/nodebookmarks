
/**
 * Module dependencies.
 */

var express = require('express')
  , mongoose = require('mongoose') 
  , MongoStore = require('connect-mongo')(express)
  , routes = require('./routes')
  , connect = require('./connect')
  , sessionDB = ''
  , app
  , config;


app = module.exports = express.createServer();

config = {
    db: {
        db: 'sessions',
        host: 'localhost'
    },
    
    secret: '076ee61d63aa10a125ea872411e433b9'
};


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


sessionDB = 'mongodb://' + config.db.host + '/' + config.db.db;
sessionDB = mongoose.createConnection(sessionDB);

app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
    app.use(express.errorHandler()); 
});


/*
    Get Routes
*/
app.get('/', routes.index);

app.get('/home', function (req, res) {
    res.redirect('/');
});

app.get('/login', function (req, res) {
    res.redirect('/#login');
});

app.get('/settings',function (req, res) {
    var user = req.session.user;
    
    if (user) {
        res.send({password: '', name: user.name, email: user.email});
    }
    else {
        res.send({});
    }
});

app.get('/logout', function (req, res) {
    if (req.session.user) {
       req.session.destroy();
    }
    
    res.redirect('/');
});



/*
    Post Routes - process requests
*/
app.post('/register', function (req, res) {
    routes.register(req, res, connect);   
});

app.post('/settings', function (req, res) {
    routes.update(req, res, connect);
});

app.post('/login', function (req, res) {   
   routes.login(req, res, connect); 
});


app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
