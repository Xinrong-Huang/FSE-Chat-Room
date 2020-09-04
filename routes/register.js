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
 
// connection.query('SELECT * from users', function(err, data, fields) {
//   if (err) {
//     console.log(err);
//     return;
//   };
 
//   console.log(JSON.parse(JSON.stringify(data)));
// });

router.get('/', function(req, res, next) {
  res.render('register', { title: 'FSE Chat Room Register' });
});

// router.post('/', function(req, res, next) {
//   console.log("username:", req.body.userid);
//   console.log("password:", req.body.userpwd);
//   var username = req.body.userid;
//   var password = req.body.userpwd

//   connection.query("SELECT * FROM Users WHERE username='"+username+"'", function (err, data) {
//   	console.log("in");
//   	if (err) {
//         console.log(err);
//     } else {
//     	console.log("----------");
//     	console.log(data);
//         if (data.length > 0){
//         	console.log("username exists");
//         	res.redirect('/');
//         } else {
//         	var sql = "INSERT INTO Users (username, password) VALUES (username, password)";
//         	connection.query(sql, function (err, result) {
// 		    if (err) throw err;
// 			    console.log("1 record inserted");
// 			  });
//         	res.redirect('/');
//         }
//     }
//   });
//   // res.redirect('/');

  
// });

module.exports = router;