// Fetching all bookmarks
exports.bookmarks = function (req, res, bookmarkModel) {
    if (!req.session.user) {
        res.send({error: false, msg: 'You are not logged in'});
        return;
    } else {
    
        bookmarkModel.getAll(req.session.user._id, function (error,  bookmarks) {
            if (error) {
                res.send(500, {error: true, msg: 'Bookmarks not found'}); 
            } else {
                res.send(bookmarks);  
            }
        });
        
    }
};


//Adding a new bookmark
exports.addbookmark = function (req, res, bookmarkModel) {
    if (!req.session.user) {
        res.send(500, {error: true, msg: 'You are not logged in'});
    } else {
        var bookmarkObj = {};
        
        bookmarkObj.owner = req.session.user._id;
        bookmarkObj.title = req.body.title;
        bookmarkObj.url = req.body.url;
        bookmarkObj.notes = req.body.notes;
        bookmarkObj.starred = req.body.starred;
        bookmarkObj.publik = req.body.publik;
        bookmarkObj.tags = req.body.tags;
        bookmarkObj.date = req.body.date;
        
        bookmarkModel.add(bookmarkObj,  function (error,  bookmark) {
            if (error) {
                res.send(500, {error: true, msg: 'An error occured, Bookmark not saved'}); 
            } else {
               res.send({error: false, msg: 'Bookmarks saved', model: bookmark});   
            }
        });
        
    }
};


//Updating a bookmark info
exports.updatebookmark = function (req, res, bookmarkModel) {
    if (req.session.user) {
        var user = req.session.user,
            bookmarkObj = {};
        
        bookmarkObj.owner = user._id;
        bookmarkObj.title = req.body.title;
        bookmarkObj.url = req.body.url;
        bookmarkObj.notes = req.body.notes;
        bookmarkObj.starred = req.body.starred;
        bookmarkObj.publik = req.body.publik;
        bookmarkObj.tags = req.body.tags;
        bookmarkObj.date = req.body.date;
        
        bookmarkModel.update(req.params.id, bookmarkObj, function (error, updatedBookmark) {
            if (error) {
                res.send(500, {error: true, msg: 'An error occured, bookmark not updated'});
            } else {
                res.send({error: false, msg: 'Bookmark successfully updated'});                    
            }
        });
    }
    else {
        res.send(500, {error: true, msg: 'An error occured, you are not logged in'});
    }
};


// Deleting a bookmark
exports.deletebookmark = function (req, res, bookmarkModel) {
    if (req.session.user) {
        bookmarkModel.remove(req.params.id, function (error, updatedBookmark) {
            if (error) {
                res.send(500, {error: true, msg: 'An error occured, bookmark not deleted'});
            } else {
                res.send({error: false, msg: 'Bookmark successfully deleted'});                    
            }
        });
    }
    else {
        res.send(500, {error: true, msg: 'You are not logged in'});
    }
};


