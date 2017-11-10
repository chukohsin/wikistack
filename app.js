'use strict';
var express = require('express');
var app = express();
var morgan = require('morgan');
var nunjucks = require('nunjucks');
var makesRouter = require('./routes');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var bodyParser = require('body-parser');
var socketio = require('socket.io');
var models = require('./models')

// templating boilerplate setup
app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
+nunjucks.configure('views', { noCache: true }); // where to find the views, caching off

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests


models.db.sync({force: true})
.then(function () {
    // make sure to replace the name below with your express app
    var server = app.listen(3000, function () {
        console.log('Server is listening on port 3001!');
    });
    socketio.listen(server);
})
.catch(console.error);


// start the server
// var server = app.listen(1337, function(){
//   console.log('listening on port 1337');
// });
//var io = socketio.listen(server);

app.use(express.static(path.join(__dirname, '/public')));

// modular routing that uses io inside it
app.get('/', function(req, res, next) {
	res.render('./layout.html');
});