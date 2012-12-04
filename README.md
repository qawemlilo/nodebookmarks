# Bookmark Manager

Bookmark Manager is a Rich JavaScript Application for managing browser bookmarks. The front-end uses backbone(and twitter bootstrap) and the back-end runs on Node. 

## A bit of history

A while ago I created a bookmarking app which was basically a hack that saved all bookmarks on a Google Docs spreadsheet <https://github.com/qawemlilo/Bookmarks>. The app stopped working when the number of my bookmarks got too large. This made me decide to create a more polished app that other people could also use. The fundamental goal is to make Bookmark Manager useful and dead simple to use.


# Directory Structure

```
/bookmarkmanager/app
    app.js
    
    config.js
    
    package.json
    
    /models
        bookmarks.js
        users.js
        
    /node_modules
        ....
    
    /public
        /images
            ....
            
        /stylesheets
            ....
            
        /javascripts
            app.js
            
            controller.js
            
            /views
                /bookmark
                    bookmark.js
                    /tmpl
                        bookmark.ejs
                
                /bookmarks
                    bookmarks.js
                    
                /controls
                    controls.js 
                    /tmpl
                        controls.ejs
                        
                /forms
                    profile.js
                    register.js
                    /tmpl
                        profile.ejs
                        
                        
                /pagination
                    pagination.js 
                    /tmpl
                        pagination.ejs
                    
                    
            /models
                bookmark.js
                user.js
                
            
            /collections
                bookmarks.js
            
            /routes
                home.js
                router.js
                
            /libs
                .....
    
    /routes
        bookmarks.js        
        users.js
        
    /views
        ....
```

# The Back End

### Modules

 - Express
 
 - Mongoose
 
 - connect-mongo
 
 - Nodemailer
 
 - Express-validator

The application back-end uses 2 main models, Users Model and Bookmarks Model.
 

## Users Model

The Users Model API handles CRUD operations on users collection for both logged in users and guest users

### Logged in users

Logged users interact with the Users Model in several ways: 

1. When they view their account information
```
GET /user
```
  
2. When they edit their account information
```
PUT /user/:id
```
  
3. When they delete their account
```
POST /user/delete
```
  
4. When they logout(Not a CRUD operation but we place it here for organisational purposes)
```
GET /user/logout
```


### Guest users

Guest users can interact with the Users Model in following ways: 

1. When they create an account
```
POST /user
```
  
2. When login
```
POST /user/login
```


## Bookmarks Model

The Bookmarks Model API handles CRUD operations on bookmarks collection for logged in users (demo bookmarks being the only ones accessible to the public)

### Logged in users

Logged users perform all available CRUD operations on the bookmarks collection: 

1. When they create a new bookmark
```
POST /bookmarks
```
  
2. When they edit a bookmark
```
PUT /bookmarks/:id
```
  
3. When they delete a bookmark
```
DELETE /bookmarks/:id
```
  
4. When they fetch bookmark
```
GET /bookmarks
```


### Guest users

Guest users can only view the demo page which reads the data from an account that I created: 

1. When they fetch bookmarks

```
GET /bookmarks
```



   


# License

(MIT License)

Copyright (c) 2012 Qawelesizwe Mlilo <qawemlilo@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.