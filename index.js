var express = require('express');
var app = express();
var superagent = require('superagent');
var fs = require('fs');
var path = require('path');
const opn = require('opn');

app.listen('8088', function () {
  console.log('server started');
  console.log('http://localhost:8088');
});

opn('http://localhost:8088');

app.get('/getorder', function (req, res) {
  var querydata = req.query;
  var orderid = querydata.d;
  superagent.post('http://www.cnpex.com.au/Home/Query')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send('OrderId=' + orderid)
    .end(function (err, sres) {
//		    	console.log(sres);
      var allhtml = sres.text;
      var hfront = '<div class="wrap pd20">';
      var n = allhtml.indexOf(hfront);
      var s1 = allhtml.substring(n + hfront.length);
      var hback = '<table class="webpost_query_table">';
      var n2 = s1.indexOf(hback);
      var resp = s1.substring(0, n2);
      res.send(resp.substring(resp.indexOf('<h2>'), resp.indexOf('</h2>')));
    });
});

app.get('/', function (req, res) {
  var data = fs.readFileSync('index.html', 'utf-8');
  res.send(data);
});

app.get('/bill', function (req, res) {
  var data = fs.readFileSync('bill.json', 'utf-8');
  res.send(data);
});