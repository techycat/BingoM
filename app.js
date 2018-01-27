var express = require('express');
var path = require('path');
var fs = require('fs');
var url = require('url');
var app = express();

var server_port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.get('/', function(req, res) {

 	console.log("URL : "+req.url);
 	if(req.url.indexOf('.css') != -1) {
    var cssFile = fs.readFileSync("./css/bingomcss.css");
    res.writeHead(200,{'Content-Type': 'text/css'});
    res.write(cssFile);
    res.end();
    }
    else if(req.url.indexOf('.js') != -1) {
    var jsFile = fs.readFileSync("./js/bingomjs.css");
    res.writeHead(200,{'Content-Type': 'text/javascript'});
    res.write(jsFile);
    res.end();
    }
    else {
    var htmlFile = fs.readFileSync("./bingom1.html");
    res.writeHead(200,{'Content-Type': 'text/html'});
    res.write(htmlFile);
    res.end();
    }
});

app.listen(server_port,server_ip, function() {
	console.log("Dir "+__dirname)
	// body...
	console.log("Listening on "+server_ip+" port : "+server_port);
});
module.exports = app;
