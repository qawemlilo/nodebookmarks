var mongoose = require('mongoose'), 
    db = mongoose.createConnection('mongodb://localhost/nodebookmarks'), 
    Schema = mongoose.Schema,    
    BookmarkSchema, 
    validString,
    BookmarkSchema,
    Bookmark;


validString = function (v) {
    return typeof v === 'string' && v.length > 2;
};


BookmarkSchema = new Schema({
    id: Schema.ObjectId,
    owner: Schema.Types.ObjectId,
    title: {type: String, default: ''},
    url: {type: String, unique: true},
    notes: {type: String, default: ''},
    starred: {type: Boolean, default: false},
    publik: {type: Boolean, default: false},
    date: {type: Date, default: Date.now},
    tags: {type: Array, default: ['uncategorised']}
});

Bookmark =  db.model('Bookmark', BookmarkSchema);


exports.add = function (bookmarkObj, fn) {
    var bookmark = new Bookmark(bookmarkObj);
    bookmark.save(function (err) {
        fn(err, bookmark);    
    });
};


exports.update = function (id, bookmarkObj, fn) {
    var Model =  db.model('Bookmark'), changed = false;
    
    Model.findById(id, function (err, bookmark) {
        if (!(!!err)) {
            
            for (key in bookmarkObj) {
                bookmark[key] = bookmarkObj[key];
            }
            
            bookmark.save(function (err) {
                if (!!err) {
                    fn(true, {});
                }
                else {
                    fn(false, bookmark);
                }
            });
        }
        else {
            fn(true, {});
        }
    });    
};


exports.remove = function (id, fn) {
    var Model =  db.model('Bookmark');
    
    Model.findOne({_id: id}, function (err, bookmark) {
        if (!(!!err)) {
            
            bookmark.remove(function (err) {
                if (!!err) {
                    fn(true, {});
                }
                else {
                    fn(false, bookmark);
                }
            });
        }
        else {
            fn(true, {});
        }
    });    
};


exports.getAll = function (id, fn) {
    var DB =  db.model('Bookmark');
    
    DB.find({owner:  id}, function (err, bookmarks) {
    
        var cleanbookmarks = bookmarks.map(function (bookmark) {
            var temparray = {};
 
            temparray.id = bookmark._id.toHexString() + '';
            temparray.tags = bookmark.tags; 
            temparray.date = bookmark.date.getTime() + '';
            temparray.publik = bookmark.publik;
            temparray.starred = bookmark.starred;
            temparray.notes = bookmark.notes; 
            temparray.title = bookmark.title; 
            temparray.url = bookmark.url;

            return temparray;
        });
        
        fn(err, cleanbookmarks);
    });
};