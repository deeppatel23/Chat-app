// Importing the express module and initializing an express application
const express = require('express')
const app = express()

// Creating an HTTP server instance using the express application
const http = require('http').Server(app);

// Importing and initializing socket.io by passing the http server instance
const io = require('socket.io')(http);

// Setting up a route to serve index.html file
app.get('/', function(req, res){
   res.sendFile('/Users/deeppatel/Desktop/Work/chat-app/index.html');
});

// Initializing an array to store the usernames
users = [];

// Listening to the 'connection' event when a user connects to the server using socket.io
io.on('connection', function(socket){
   console.log('A user connected');

   // Listening to the 'setUsername' event when a user sets a username
   socket.on('setUsername', function(data){
      console.log(data);

      // Checking if the username is already taken
      if(users.indexOf(data) > -1){
         socket.emit('userExists', data + ' username is taken! Try some other username.');
      } else {
         users.push(data); // Adding the username to the users array if it is not taken
         socket.emit('userSet', {username: data}); // Emitting the 'userSet' event to the client with the username data
      }

   });

   // Listening to the 'msg' event when a user sends a message
   socket.on('msg', function(data){
      io.sockets.emit('newmsg', data); // Broadcasting the message to all connected clients
   })
});

// Starting the server and listening on port 3000
http.listen(3000, function(){
   console.log('listening on *:3000');
});