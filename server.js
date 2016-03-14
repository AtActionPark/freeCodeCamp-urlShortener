'use strict';
require('dotenv').load();
var express = require('express');
var routes = require('./app/routes/index.js');
var mongo = require('mongodb');


var app = express();
require('dotenv').config();

mongo.connect('mongodb://localhost:27017/clementinejs', function (err, db) {

    if (err) {
        throw new Error('Database failed to connect!');
    } else {
        console.log('MongoDB successfully connected on port 27017.');
    }

    app.use('/public', express.static(process.cwd() + '/public'));
    app.use('/common', express.static(process.cwd() + '/app/common'));
    app.use('/controllers', express.static(process.cwd() + '/app/controllers'));

    routes(app, db);

    var port = process.env.PORT || 8080;
	app.listen(port,  function () {
		console.log('Node.js listening on port ' + port + '...');
	});

});

