var express = require('express');
var app = express();

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8000;
var server_ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.get('/', function(req, res) {
	res.end('Hello Nithin');
});

app.listen(server_port,server_ip, function() {
	// body...
	console.log("Listening on "+server_ip+" port : "+server_port);
});