exports.setup = function (params) {

    var app = params.app, controllers = params.controllers;

    // Generic Routes
    app.get('/', controllers.index);     
    app.get('/home', controllers.home);   
    app.get('/privacy', controllers.privacy);
    app.get('/developers', controllers.developers);
    
    
    // User Routes 
    app.post('/user', controllers.registerUser);   
    app.get('/user', controllers.getUser);   
    app.put('/user/:id', controllers.updateUserInfo);   
    app.post('/user/delete', controllers.removeUser);
    app.post('/user/login', controllers.login);   
    app.get('/user/logout', controllers.logout);
    
    
    // Bookmark Routes
    app.post('/bookmarks', controllers.addBookmark);   
    app.get('/bookmark', controllers.addBookmarkRemotely);   
    app.get('/bookmark/:id', controllers.updateBookmarkRemotely);   
    app.get('/bookmarks', controllers.getBookmarks);
    app.put('/bookmarks/:id', controllers.updateBookmark);
    app.delete('/bookmarks/:id', controllers.removeBookmark);
    app.get('/reader/:id', controllers.readBookmark);
    
    
    // Demo
    app.get('/demo', controllers.demo);
};
