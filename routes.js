

/*    
    Middleware
*/
var loggedIn = function (req, res, next) {
    "use strict"; 
    
    if (!req.session.user) {
        res.send("Restricted access", 401);
    }
    else {
        next();
    }
},


inSession = function (req, res, next) {
    "use strict"; 
    
    if (req.session.user) {
        res.redirect('/');
    }
    else {
        next();
    }
};





/*
    Routes setup  
*/
exports.setup = function (params) {
    "use strict"; 
    
    var app = params.app, controllers = params.controllers;

    // Generic Routes
    app.get('/', controllers.index);     
    app.get('/home', controllers.home);   
    app.get('/privacy', controllers.privacy);
    app.get('/developers', controllers.developers); 
    
    // User Routes 
    app.post('/users', controllers.registerUser);   
    app.get('/users', loggedIn, controllers.getUser);   
    app.put('/users/:id', loggedIn, controllers.updateUserInfo);   
    app.post('/users/delete', loggedIn, controllers.removeUser);
    app.post('/users/login', inSession, controllers.login);   
    app.get('/users/logout', controllers.logout);
    
    // Bookmark Routes
    app.post('/bookmarks', loggedIn, controllers.addBookmark);   
    app.get('/bookmark', controllers.addBookmarkRemotely);   
    app.get('/bookmark/:id', controllers.updateBookmarkRemotely);   
    app.get('/bookmarks', loggedIn, controllers.getBookmarks);
    app.put('/bookmarks/:id', loggedIn, controllers.updateBookmark);
    app.delete('/bookmarks/:id', loggedIn, controllers.removeBookmark);
    app.get('/read/:id', controllers.readBookmark);
    
    
    // Demo
    app.get('/demo', controllers.demo);
};
