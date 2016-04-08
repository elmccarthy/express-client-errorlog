'use strict';

var path = require('path');
var express = require('express');
var app = express();
var errorlog = require('./index.js')();
app.use(errorlog);
app.get('/error', function(req, res, next) {
	res.sendFile(path.join(__dirname, 'test.html'));
});
var port = process.env.errorlog_port || 8000;
app.listen(port, function(error) {
	if (error) {
		console.error(error);
		process.exit(1);
	}
	console.log("visit <http://localhost:%s/error> to test", port);
});
