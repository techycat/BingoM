var express = require('express');
var app = express();

var server_port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.get('/', function(req, res) {
	var sum=0
	for(var i=1;i<100000;i++) {
		sum=sum+i;
		setTimeout(test,15000);
		if(sum>1000){
			sum=sum%1000;
		}
	}
	res.end('Hello Nithin '+sum);
});
function test() {
	console.log("Testing");
}

app.listen(server_port,server_ip, function() {
	// body...
	console.log("Listening on "+server_ip+" port : "+server_port);
});
module.exports = app;
