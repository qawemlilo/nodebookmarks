
// Fetching all bookmarks
exports.get = function (req, res, model) {
    var id = "5024b9236f760ecc03000001";
    
    if (req.session.user) {
        id = req.session.user._id;
    }
    
    var options = Object.create({
        limit: 100,
            
        skip: req.query.skip || 0,
            
        fields: [],
            
        query: {
            owner: id
        }
    });
    
    if (req.query.tag) {
        options.query.tags = req.query.tag;
    }
     
        
    model.get(options, function (error,  bookmarks) {
        if (error) {
            res.send(500); 
        } else {
            res.send(bookmarks);  
        }
    });  
};









//Adding a new bookmark
exports.add = function (req, res, model) {
    var bookmark = {};
        
    bookmark.owner = req.session.user._id;
    bookmark.title = req.body.title || 'Untitled';
    bookmark.url = req.body.url;
    bookmark.notes = req.body.notes;
    bookmark.starred = req.body.starred;
    bookmark.publik = req.body.publik;
    bookmark.tags = req.body.tags;
    bookmark.date = req.body.date;
        
    model.add(bookmark,  function (error,  bookmark) {
        if (error) {
            res.send(500); 
        } else {
            res.send({error: false, msg: 'Bookmark saved', model: bookmark});   
        }
    });
};











//Adding a new bookmark from a remote request
exports.addRemote = function (req, res, model) {
    var callback = req.query.callback, bookmark = {};
    
    if (!req.session.uniqueid) {
        res.send(callback + '({"error": true, "msg": "Error, user not registered"});');
        
        return;
    }
        
    bookmark.title = req.query.title || 'Untitled';
    bookmark.url = req.query.url;
    bookmark.owner = req.session.uniqueid;
        
    model.add(bookmark,  function (error,  bookmark) {
        if (error) {
            res.send(callback + '({"error": true, "msg": "Error, bookmark not saved"});');
        } else {
            res.send(callback + '({"error": false, "msg": "Bookmark saved!", "model":' + JSON.stringify(bookmark) + '});');   
        }
    });
};







//Updating a bookmark info
exports.updateRemote = function (req, res, model) {
    var callback = req.query.callback, 
        bookmark = {}, 
        tags = req.query.tags, 
        notes = req.query.notes;
    
    if (!req.session.uniqueid || (!tags && !notes)) {
        res.send(callback + '({"error": true, "msg": "Error, bookmark not updated"});');
        
        return;
    }

    bookmark.tags = tags.split(',');
    bookmark.notes = notes;
        
    model.update(req.params.id, bookmark, function (error, updatedBookmark) {
        if (error) {
            res.send(callback + '({"error": true, "msg": "Error, bookmark not updated"});');
        } else {
            res.send(callback + '({"error": false, "msg": "Bookmark updated!", "model":' + JSON.stringify(updatedBookmark) + '});');              
        }
    });
};















//Updating a bookmark info
exports.update = function (req, res, model) {
    var user = req.session.user,
        bookmark = {};
        
    bookmark.owner = user._id;
    bookmark.title = req.body.title || 'Untitled';
    bookmark.url = req.body.url;
    bookmark.notes = req.body.notes;
    bookmark.starred = req.body.starred;
    bookmark.publik = req.body.publik;
    bookmark.tags = req.body.tags;
    bookmark.date = req.body.date;
        
    model.update(req.params.id, bookmark, function (error, updatedBookmark) {
        if (error) {
            res.send(500);
        } else {
            res.send({error: false, msg: 'Bookmark successfully updated'})               
        }
    });
};

















// Deleting a bookmark
exports.remove = function (req, res, model) {
    model.remove(req.params.id, function (error, updatedBookmark) {
        if (error) {
            res.send(500);
        } else {
            res.send({error: false, msg: 'Bookmark successfully deleted'});                    
        }
    });
};




