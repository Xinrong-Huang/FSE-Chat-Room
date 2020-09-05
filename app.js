var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.locals.username = [];
var users = {};

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'Password',
  database : 'chatroom'
});
 
connection.connect();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var chatRouter = require('./routes/chat');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('socketio', io);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/chat', chatRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

io.on('connection', (socket)=>{
  console.log('New user connected', socket.id);

  // socket.broadcast.emit('message', "A new user joined"); 
  var client = socket.id;
  // console.log(app.locals.username[0], app.locals.username[1], Object.keys(users).length, client);
  socket.broadcast.emit('broadcast', app.locals.username[Object.keys(users).length]+" joined the chat.");

  //history messages
  connection.query("SELECT * FROM Messages", function (err, messages) {
  	console.log("history");
  	socket.emit("chathistory", messages);
  	// socket.on('chathistory', function(messages) {
  	// 	io.emit("chathistory", messages);
  	// });
  });
  
  users[client] = app.locals.username[Object.keys(users).length];

  // listen for message from user 
  socket.on('new_message', function(newMessage) { 
  	
  	var current_client = socket.id;

  	// format the timestamp to local time
  	var date = new Date();
  	var offset = date.getTimezoneOffset() / 60;
	var utcDate = new Date(date.toUTCString());
	utcDate.setHours(utcDate.getHours()-offset);
	var usDate = new Date(utcDate);
	var date = usDate.toISOString().split('T')[0],
		time = usDate.toISOString().split('T')[1];
	time = time.split('.')[0];
	var timestamp = date+' '+time;

    console.log(users[current_client], 'client says', newMessage, timestamp); 
    socket.emit('new_message', 'me', newMessage, timestamp);
    socket.broadcast.emit('new_message', users[current_client], newMessage, timestamp);

    var sql = "INSERT INTO Messages (username, timestamp, message) VALUES ('"+users[current_client]+"', '"+timestamp+"', '"+newMessage+"')";
	connection.query(sql, function (err, result) {
	    if (err) throw err;
		console.log("1 message inserted");
	});
  }); 

  //client disconnects
  socket.on('disconnect', function(){
  	var current_client = socket.id;
  	socket.broadcast.emit('broadcast', users[current_client]+" left the chat.");
  })
});


// module.exports = app;
module.exports = {app: app, server: server};
