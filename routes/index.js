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
 
connection.query('SELECT * from users', function(err, data, fields) {
  if (err) {
    console.log(err);
    return;
  };
 
  console.log(JSON.parse(JSON.stringify(data)));
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'FSE Chat Room' });
});

router.post('/', function(req, res, next) {
  var username = req.body.userid;
  var password = req.body.userpwd

  connection.query("SELECT * FROM Users WHERE username='"+username+"'", function (err, data) {
  	console.log("innnn");
  	if (err) {
        console.log(err);
    } else {
    	
    	console.log(data);
        if (data.length > 0){
        	console.log("username exists");
        	res.redirect('/register');
        } else {
        	var sql = "INSERT INTO Users (username, password) VALUES ('"+username+"', '"+password+"')";
        	console.log("----------");
        	connection.query(sql, function (err, result) {
			    if (err) throw err;
				console.log("1 record inserted");
			});
        	res.redirect('/');
        }
    }
  });
});

router.post('/chat', function(req, res, next) {
  var username = req.body.userid;
  var password = req.body.userpwd;
  req.app.locals.username.push(username);

  connection.query("SELECT * FROM Users WHERE password= '"+password+"' AND username='"+username+"'", function (err, data) {
  	console.log("innnnnn");
  	if (err) {
        console.log(err); 
    } else {
    	console.log(data);
        if (data.length == 1){
        	console.log("correct");
        	res.redirect('/chat');
        } else {
        	res.redirect('/');
        }
    }
  });
});

// connection.end();

module.exports = router;

