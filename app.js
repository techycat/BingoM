var express = require('express');
var path = require('path');
var fs = require('fs');
var url = require('url');
var app = express();

var server_port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.get('/', function(req, res) {

 	console.log("URL : "+req.url);
    var htmlFile = fs.readFileSync(__dirname+"/html/bingom.html");
    res.writeHead(200,{'Content-Type': 'text/html'});
    res.write(htmlFile);
    res.end();

});
app.get('/css/bingomcss.css', function(req, res) {

 	console.log("URL : "+req.url);
    var cssFile = fs.readFileSync(__dirname+"/css/bingomcss.css");
    res.writeHead(200,{'Content-Type': 'text/css'});
    res.write(cssFile);
    res.end();

 });
app.get('/js/bingomjs.js', function(req, res) {

 	console.log("URL : "+req.url);
    var jsFile = fs.readFileSync(__dirname+"/js/bingomjs.js");
    res.writeHead(200,{'Content-Type': 'text/javascript'});
    res.write(jsFile);
    res.end();

 });

app.listen(server_port,server_ip, function() {
	console.log("Dir "+__dirname)
	// body...
	console.log("Listening on "+server_ip+" port : "+server_port);
});
module.exports = app;
