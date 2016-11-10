var express = require('express');
var app = express();
var superagent = require('superagent');
var fs= require('fs');
var path = require('path');

app.listen('8088', function(){
    console.log('server started');
    console.log('http://localhost:8088');
});


//{'Content-Type': 'image/png', 'Cache-Control': 'no-cache'}

var img={};

function loadfiles(imgname){
	
}

app.get('/getorder', function(req, res) {
		var querydata = req.query;
		var orderid = querydata.d;
		console.log(orderid);
		superagent.post('http://www.cnpex.com.au/Home/Query')
		    .set('Content-Type', 'application/x-www-form-urlencoded')
		    .send('OrderId='+orderid)
		    .end(function(err, sres){
//		    	console.log(sres);
		    	var allhtml=sres.text;
		    	var hfront = '<div class="wrap pd20">';
		    	var n = allhtml.indexOf(hfront);
		    	var s1 = allhtml.substring(n+hfront.length);
		    	var hback = '<table class="webpost_query_table">';
		    	var n2 = s1.indexOf(hback);
		    	var resp = s1.substring(0,n2);
		    	res.send(resp);
		    });
});

app.get('/', function(req, res) {
	var data = fs.readFileSync('index.html','utf-8');  
	res.send(data);
});

app.get('/test', function(req, res) {
	
	
	res.set({
		  'Content-Type': 'image/png',
		  'Cache-Control': 'no-cache'
		});
    superagent.get('https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png')
    .end(function(err, sres){
    	fs.writeFile("3",sres.body);
    	res.send(sres.body);
    });
	
    







//    sreq.on('end', function(err, sres){
//
//    });
//    sreq.pipe(res);



});
