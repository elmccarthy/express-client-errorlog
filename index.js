'use strict';

var path = require('path');
var _ = require('lodash');
var logger = require('winston');
var express = require('express');
var body_parser = require('body-parser');

module.exports = function(options) {
	var app = express();
	app.use(body_parser.text());
	app.get('/errorlog.js', function(req, res, next) {
		var method = res.sendFile ? 'sendFile' : 'sendfile';
		res[method](path.join(__dirname, 'errorlog.js'));
	});
	app.post('/errorlog', function(req, res, next) {
		var options = app.get('errorlog_options');
		var meta = _.reduce(options.headers, function(meta, header) {
			meta[header] = req.header(header);
			return meta;
		}, {ip: req.ip});
		try {
			options.logger.error(req.body, meta);
			var method = res.sendStatus ? 'sendStatus' : 'status';
			res[method](200);
		} catch (error) {
			next(error);
		}
	});
	app.use(express.static('static'));
	app.set('errorlog_options', _.defaults(options, {
		logger: logger,
		headers: ['Referer', 'User-Agent']
	}));
	return app;
};
