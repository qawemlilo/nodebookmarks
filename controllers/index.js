
function Controllers (params) {
    "use strict";
    
    var Bookmarks = params.Bookmarks,
        Users = params.Users,
        pages = require('./pages')(Bookmarks),
        user = require('./user')(Users),
        bookmark = require('./bookmark')(Bookmarks),
        demo = require('./demo')(Bookmarks),
        controllers = Object.create({});

    
    
    /*
        Pages
    */    
    controllers.index = function (req, res) {
        pages.index(req, res);
    };

    controllers.home = function (req, res) {
        pages.home(req, res);
    };    
    
    controllers.privacy = function (req, res) {
        pages.privacy(req, res);
    };   
    
    controllers.developers = function (req, res) {
        pages.developers(req, res);
    };    
    

    
    
    /*
        Users
    */    
    controllers.registerUser = function (req, res) {
        user.register(req, res);       
    };
    
    controllers.getUser = function (req, res) {
        user.get(req, res);
    };    
    
    controllers.updateUserInfo = function (req, res) {
        user.update(req, res);
    };    
    
    controllers.removeUser = function (req, res) {
        user.remove(req, res)
    };    
    
    controllers.login = function (req, res) {
        user.login(req, res);
    };    
    
    controllers.logout = function (req, res) {
        user.logout(req, res);
    };
    
    
    
    
    /*
        Bookmarks
    */
    controllers.addBookmark = function (req, res) {
        bookmark.create(req, res);
    };
    
    controllers.addBookmarkRemotely = function (req, res) {
        bookmark.remoteCreate(req, res);
    };
    
    controllers.updateBookmark = function (req, res) {
        bookmark.update(req, res);
    };
    
    controllers.updateBookmarkRemotely = function (req, res) {
        bookmark.remoteUpdate(req, res);
    };
    
    controllers.getBookmarks = function (req, res) {
        bookmark.get(req, res);  
    };

    controllers.removeBookmark = function (req, res) {
        bookmark.remove(req, res);
    }; 
    
    controllers.readBookmark = function (req, res) {
        bookmark.read(req, res);         
    };

    
    
    // Demo
    controllers.demo = function (req, res) {
        demo.create(req, res);
    };

    
    return controllers;
};

module.exports = Controllers;
