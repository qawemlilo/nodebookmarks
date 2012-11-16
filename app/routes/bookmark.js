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
exports.addbookmark = function (req, res, model) {
    if (!req.session.user) {
        res.send(500, {error: true, msg: 'You are not logged in'});
    } else {
        var bookmark = {};
        
        bookmark.owner = req.session.user._id;
        bookmark.title = req.body.title;
        bookmark.url = req.body.url;
        bookmark.notes = req.body.notes;
        bookmark.starred = req.body.starred;
        bookmark.publik = req.body.publik;
        bookmark.tags = req.body.tags;
        bookmark.date = req.body.date;
        
        model.add(bookmark,  function (error,  bookmark) {
            if (error) {
                res.send(500, {error: true, msg: 'An error occured, Bookmark not saved'}); 
            } else {
               res.send({error: false, msg: 'Bookmarks saved', model: bookmark});   
            }
        });
        
    }
};


//Updating a bookmark info
exports.updatebookmark = function (req, res, model) {
    if (req.session.user) {
        var user = req.session.user,
            bookmark = {};
        
        bookmark.owner = user._id;
        bookmark.title = req.body.title;
        bookmark.url = req.body.url;
        bookmark.notes = req.body.notes;
        bookmark.starred = req.body.starred;
        bookmark.publik = req.body.publik;
        bookmark.tags = req.body.tags;
        bookmark.date = req.body.date;
        
        model.update(req.params.id, bookmark, function (error, updatedBookmark) {
            if (error) {
                res.send(500, {error: true, msg: 'An error occured, bookmark not updated'});
            } else {
                res.send({error: false, msg: 'Bookmark successfully updated'})               
            }
        });
    }
    else {
        res.send(500, {error: true, msg: 'An error occured, you are not logged in'});
    }
};


// Deleting a bookmark
exports.deletebookmark = function (req, res, model) {
    if (req.session.user) {
        model.remove(req.params.id, function (error, updatedBookmark) {
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


