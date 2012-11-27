/*
****************************************************
COPYRIGHT © 2012 Raging Flame
AUTHOR: Qawelesizwe Mlilo
Email: qawemlilo@gmail.com
****************************************************
*/

(function (window) {
    var saveBookmark, echoMessage, createForm, setStyle;
    
    
    
    
    
    
    saveBookmark = function (url) {
        var js = document.createElement('script');
        
        js.setAttribute('type', 'text/javascript');
        js.setAttribute('src', url);
        
        document.getElementsByTagName('head')[0].appendChild(js);
    };
    
    
    
    
    
    
    setStyle = function (el, spec) {
        for (var n in spec) {
            if (spec.hasOwnProperty(n)) {
                el.style[n] = spec[n];
            }
        }
    };
    
    
    
    
    
    
    
    
    createForm = function (msg, id) {
        var form = document.createElement('form'),
            h3 = document.createElement('h3'),        
            label = document.createElement('label'),
            input = document.createElement('input'),
            button = document.createElement('button'),
            kancel = document.createElement('button');
        
        setStyle(form, {
            position: 'fixed',
            top: '50%',
            left: '50%',
            margin: '-100px 0px 0px -200px',
            width: '340px',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
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
        
        
        
        
        
        
        form.action = 'http://localhost:3003';
        form.method = 'get';
        
        
        
        
        form.onsubmit = function (event) {
            event.preventDefault ? event.preventDefault() : event.returnValue = false;
            
            var tags = this.elements.tags.value, url = 'http://localhost:3003/bookmark/' + id + '/?callback=echoMessage&tags=',
                notes = this.elements.tags.notes;
            
            if (tags || notes) {
                if (tags) {
                    url += encodeURIComponent(tags);
                }
                if (notes) {
                    url += encodeURIComponent(tags);
                }
               
                saveBookmark(url);    
            }
            
            document.body.removeChild(this);
            
            return false;
        };
        
        
        
        
        
        
        
        setStyle(label, {
            display: 'block',
            margin: '0px 0px 5px 0px'
        });
        
        
        
        setStyle(button, {
            textAlign: 'center',
            margin: '10px 10px 10px 0px'
        });
        button.type = 'submit';
        
        
        setStyle(kancel, {
            textAlign: 'center',
            margin: '10px 0px 10px 0px'
        });
        
        kancel.onclick = function (event) {
            event.preventDefault ? event.preventDefault() : event.returnValue = false;
            
            document.body.removeChild(form);
            
            return false;
        };
        
        setStyle(h3, {
            textAlign: 'center',
            fontSize: '18px',
            color: '#51A351',
            display: 'block',
            fontWeight: 'bold',
            margin: '0px 0px 10px 0px'
        });
        
        
        
        setStyle(input, {
            type: 'text',
            border: '1px solid #ccc',
            width: '300px',
            display: 'block',
            padding: '5px'
        });
        
        
        
        input.name = 'tags',
        
        
        
        
        
        label.appendChild(document.createTextNode('Add tags for your bookmark'));
        h3.appendChild(document.createTextNode(msg));
        button.appendChild(document.createTextNode('Update'));
        kancel.appendChild(document.createTextNode('Cancel'));
        
        
        
        
        form.appendChild(h3);
        form.appendChild(label);
        form.appendChild(input);
        form.appendChild(button);
        form.appendChild(kancel);
        
        
        
        document.body.appendChild(form);
    };
    
    
    
    
    
    
    

    echoMessage = function (obj) {
        var msgBox = document.createElement('div'), 
            msg, 
            a; 
        
        
        
        
        
        setStyle(msgBox, {
            position: 'fixed',
            height: '20px',
            top: '50%',
            left: '50%',
            margin: '-30px 0px 0px -195px',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            color: '#333333',
            padding: '20px',
            fontSize: '16px',
            fontFamily: '"Myriad Pro",Arial,Helvetica,sans-serif',
            textAlign: 'center',
            zIndex: 100000,
            textShadow: '1px 1px 0 white',
            borderRadius: "12px",
            boxShadow: '0 0 6px #ccc'
        });
        
        
        
        
        
        
        if (!obj.error && obj.msg === 'Bookmark saved') {
            createForm(obj.msg + '!', obj.model.id);
            return;
        }
        
        else if (obj.msg === 'Server error' || obj.msg === 'Tags saved' || obj.msg === 'Error occured, bookmark not updated') {
            msg = document.createTextNode(obj.msg + '!');
        }
        else {
            a = document.createElement('a');
            
            a.href = 'http://localhost:3003';
            a.target = '_blank';
            a.appendChild(document.createTextNode('Account not found, register or login'));
            
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

    
    
    
    
    window.echoMessage = echoMessage;

    saveBookmark('http://localhost:3003/bookmark?callback=echoMessage&url='+encodeURIComponent(location.href) + '&title=' + encodeURIComponent(document.title));  
      
}(window));

