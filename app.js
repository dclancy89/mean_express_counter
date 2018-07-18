var express = require("express");
var session = require('express-session');

var app = express();

app.use(session({
    secret: 'jkf;dsau9few',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    
    if(!request.session.count) {
        request.session.count = 1;
    } else {
        request.session.count = request.session.count + 1;
    }

    console.log(request.session.count);
    response.render('index', {count: request.session.count});
})

app.get('/2', function(request, response) {
    request.session.count = request.session.count + 1;
    response.redirect('/');
})

app.get('/clear', function(request, response) {
    request.session.count = 0;
    response.redirect('/');
})

app.listen(8000, function() {
    console.log("listening on port 8000");
})