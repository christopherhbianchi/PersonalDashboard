var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config'); //will automatically grab from index file in this folder
var setupController = require('./controllers/setupController.js');
var todoController = require('./controllers/todoController.js');
var authController = require('./controllers/authController.js');

var port = process.env.PORT || 3000;


app.use('/', express.static(__dirname + '/public'));
//don't need since using CDN --> app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.set('view engine', 'ejs');

mongoose.connect(config.getDbConnectionString()); //can now open and keep connection to DB

/*
only do this 1 time prior to having our DB seeded. Otherwise it would just
continue to seed the DB with the same data everytime the app was run.
*/

// setupController(app);
todoController(app);
authController(app);

app.listen(port);
