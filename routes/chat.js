var express = require('express');
var router = express.Router();

// var mysql = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'Love697198!',
//   database : 'chatroom'
// });
 
// connection.connect();

router.get('/', function(req, res, next) {
  res.render('chat', { title: 'FSE Chat Room' });
 //  console.log('history--------');
 //  connection.query("SELECT * FROM Messages", function (err, messages) {
	// res.send(JSON.stringify(messages));
 //  });
// app.get("/chat", function(req, res) {
// 	console.log('history--------');
// 	connection.query("SELECT * FROM Messages", function (err, messages) {
// 		res.send(JSON.stringify(messages));
// 	});
// });
 //  const io = req.app.get('socketio'); 
	// io.on('connection', (socket)=>{
	//   console.log('New user connected', socket.id);
	  
	  // // listen for message from user 
	  // socket.on('new_message', function(newMessage) { 
	  //   console.log('client says', newMessage); 
	  //   io.emit("new_message", newMessage);
	  // }); 
	// });  
	// grab the id from the request

   // const socketId = req.body.msg.socketId
   // console.log('hellooooooo');

   // // get the io object ref
   // const io = req.app.get('socketio')

  

   // // create a ref to the client socket
   // const senderSocket = io.sockets.connected[socketId]
   
   // Message.create(req.body.message)
   //   .then(message => {

   //    // in case the client was disconnected after the request was sent
   //    // and there's no longer a socket with that id
   //    if (senderSocket) {

   //      // use broadcast.emit to message everyone except the original
   //      // sender of the request !!! 
   //      senderSocket.broadcast.emit('message broadcast', { message })
   //    }
   //    res.status(201).json({ message: message.toObject() })
   //   })
   //   .catch(next)
});

// router.get("/chat", function(req, res) {
// 	console.log('history--------');
	// connection.query("SELECT * FROM Messages", function (err, messages) {
	// 	res.send(JSON.stringify(messages));
	// });
// });


module.exports = router;
