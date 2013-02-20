
var express = require('express'),
    expressValidator = require('express-validator'),
    
    mongoose = require('mongoose'),
    MongoStore = require('connect-mongo')(express),
    
    config = require('./config'),
    routes = require('./routes'),
    
    Users = require('./models/users'),
    Bookmarks = require('./models/bookmarks'),
    Mailer = require('./models/mailer'),
    
    controllers = require('./controllers')({
        Users: Users,
        Bookmarks: Bookmarks,
        Mailer: Mailer
    }),

    dbSession = '',
    app;    

 
app = module.exports = express.createServer();





/***********************************
   Configuration   
************************************/
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
    app.use("/app", express.static(__dirname + '/public/javascripts/build/app')); //added this line support requirejs routes
    //app.use("/javascripts/libs", express.static(__dirname + '/public/javascripts/build/app/libs')); // to support old API
});


dbSession = 'mongodb://' + config.db.host + '/' + config.db.db;
mongoose.createConnection(dbSession);


app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function () {
    app.use(express.errorHandler()); 
});



/***********************************
   Routes   
************************************/
routes.setup({
    'controllers': controllers,
    'app': app
});



/********************************
    Kick up the server!!!!
*********************************/

app.listen(3003);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);


