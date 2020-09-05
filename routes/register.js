var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'Password',
  database : 'chatroom'
});
 
connection.connect();

router.get('/', function(req, res, next) {
  res.render('register', { title: 'FSE Chat Room Register' });
});

module.exports = router;