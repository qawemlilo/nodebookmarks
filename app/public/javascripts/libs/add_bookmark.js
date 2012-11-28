/*
****************************************************
COPYRIGHT © 2012 Raging Flame
AUTHOR: Qawelesizwe Mlilo
Email: qawemlilo@gmail.com
****************************************************
*/

(function (window) {
    "use strict";
    
    if (!String.prototype.trim) {
        String.prototype.trim = function() {   // 
	        return this.replace(/^\s+|\s+$/g,'');
        };
    }

    
    var saveBookmark, 
        echoMessage, 
        createForm, 
        setStyle,
        callback = 'hdasa667asd';

    saveBookmark = function (url) {
        var js = document.createElement('script');
        
        js.setAttribute('type', 'text/javascript');
        js.setAttribute('src', url);
        
        document.getElementsByTagName('head')[0].appendChild(js);
    };

    
    
    setStyle = function (elem, props) {
        var prop;
        for (prop in props) {
            if (props.hasOwnProperty(prop)) {
                elem.style[prop] = props[prop];
            }
        }
    };
    
    
    
    createForm = function (msg, id) {
        var form = document.createElement('form'),
            h3 = document.createElement('h3'),        
            label = document.createElement('label'),
            noteLabel = document.createElement('label'),
            input = document.createElement('input'),
            notes = document.createElement('textarea'),
            button = document.createElement('button'),
            kancel = document.createElement('button');
        
        setStyle(form, {
            position: 'fixed',
            top: '50%',
            left: '50%',
            margin: '-150px 0px 0px -200px',
            width: '340px',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            float: 'none',
            color: '#333333',
            padding: '20px',
            fontSize: '16px',
            fontFamily: '"Myriad Pro",Arial,Helvetica,sans-serif',
            textAlign: 'left',
            zIndex: 100000,
            textShadow: '1px 1px 0 white',
            borderRadius: "12px",
            boxShadow: '0 0 6px #ccc'
        });

        form.action = 'http://www.bookmarkmanager.co.za/';
        form.method = 'get';

        form.onsubmit = function (event) {
            if (event.preventDefault) {
                event.preventDefault();
            }
            else {
                event.returnValue = false;
            }
            
            var tags = this.elements.tags.value, url = 'http://www.bookmarkmanager.co.za/bookmark/' + id + '/?callback=' + callback,
                notes = this.elements.notes.value;
            
            if (tags || notes) {
                if (tags) {
                    tags = tags.trim();
                    url += '&tags=' + encodeURIComponent(tags);
                }
                if (notes) {
                    url += '&notes=' + encodeURIComponent(notes);
                }
               
                saveBookmark(url);    
            }
            
            document.body.removeChild(this);
            
            return false;
        };
        
        
        
        setStyle(h3, {
            textAlign: 'center',
            fontSize: '18px',
            color: '#51A351',
            float: 'none',
            display: 'block',
            fontWeight: 'bold',
            margin: '0px 0px 10px 0px'
        });
        
        
        
        setStyle(label, {
            display: 'block',
            textAlign: 'left',
            float: 'none',
            color: '#333333',
            fontWeight: 'Normal',
            margin: '0px 0px 5px 0px'
        });
        
        setStyle(input, {
            type: 'text',
            border: '1px solid #ccc',
            width: '300px',
            float: 'none',
            display: 'block',
            padding: '5px',
            margin: '0px'
        });
        input.name = 'tags';
        

        
        setStyle(noteLabel, {
            display: 'block',
            textAlign: 'left',
            color: '#333333',
            float: 'none',
            fontWeight: 'Normal',
            margin: '10px 0px 5px 0px'
        });
        
        
        
        setStyle(notes, {
            border: '1px solid #ccc',
            width: '300px',
            float: 'none',
            display: 'block',
            padding: '5px',
            margin: '0px'
        });
        notes.cols = '10';
        notes.rows = '2';
        notes.name = 'notes';

        
        
        setStyle(button, {
            textAlign: 'center',
            float: 'none',
            margin: '10px 10px 10px 0px'
        });
        button.type = 'submit';

        setStyle(kancel, {
            textAlign: 'center',
            float: 'none',
            margin: '10px 0px 10px 0px'
        });
        
        kancel.onclick = function (event) {
            if (event.preventDefault) {
                event.preventDefault();
            }
            else {
                event.returnValue = false;
            }
            
            document.body.removeChild(form);
            
            return false;
        };
        
        
        
        label.appendChild(document.createTextNode('Tags (e.g python, git, demos)'));
        noteLabel.appendChild(document.createTextNode('Notes'));
        h3.appendChild(document.createTextNode(msg));
        button.appendChild(document.createTextNode('Save'));
        kancel.appendChild(document.createTextNode('Cancel'));

        
        
        form.appendChild(h3);
        form.appendChild(label);
        form.appendChild(input);
        form.appendChild(noteLabel);
        form.appendChild(notes);
        form.appendChild(button);
        form.appendChild(kancel);
        
        
        
        document.body.appendChild(form);
    };
    
    
    
    echoMessage = function (obj) {
        var msgBox = document.createElement('div'), 
            msg, a;
            
        setStyle(msgBox, {
            position: 'fixed',
            height: '20px',
            top: '50%',
            left: '50%',
            margin: '-30px 0px 0px -195px',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            color: '#333333',
            'float': 'none',
            padding: '20px',
            fontSize: '16px',
            fontFamily: '"Myriad Pro",Arial,Helvetica,sans-serif',
            textAlign: 'center',
            zIndex: 100000,
            textShadow: '1px 1px 0 white',
            borderRadius: "12px",
            boxShadow: '0 0 6px #ccc'
        });
        
        if (!obj.error && obj.msg === 'Bookmark saved!') {
            createForm(obj.msg, obj.model.id);
            return;
        }
        
        
        else if (!obj.error && obj.msg === 'Bookmark updated!') {
            setStyle(msgBox, {color: '#51A351'});
            msg = document.createTextNode(obj.msg);
        }
        
        else if (obj.msg === 'Error, bookmark not saved' || obj.msg === 'Error, bookmark not updated') {
            setStyle(msgBox, {color: '#D8000C'});
            msg = document.createTextNode(obj.msg);
        }
        else {
            a = document.createElement('a');
            
            a.href = 'http://www.bookmarkmanager.co.za/#user/login';
            a.target = '_blank';
            a.appendChild(document.createTextNode('Account not found, register or login first'));
            
            msg = a;
        }
        
        
        msgBox.appendChild(msg);
        document.body.appendChild(msgBox);
        
        
        
        window.setTimeout(function () {
            try {
			    document.body.removeChild(msgBox);
            } catch (error) {}
	    }, 5000);
    };
    
    window.hdasa667asd = echoMessage;

    saveBookmark('http://www.bookmarkmanager.co.za/bookmark?callback=' + callback + '&url='+encodeURIComponent(location.href) + '&title=' + encodeURIComponent(document.title));  
      
}(window));

