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
   socket.on('setUsernameAndRoom', function(username, room){
      console.log(username);
      console.log(room);
      // Checking if the username is already taken
      if(users.indexOf(username) > -1){
         socket.emit('userExists', username + ' username is taken! Try some other username.');
      } else {
         users.push(username); // Adding the username to the users array if it is not taken
         socket.username = username;
         socket.room = room;
         socket.join(room);
         socket.emit('userSet', `You ${username} have successfully joined the room ${room}`);
         socket.broadcast.to(room).emit('message', `${username} has joined this room`);
      }

   });

   // Listening to the 'msg' event when a user sends a message
   socket.on('message', function(message){
    io.to(socket.room).emit('message', `${socket.username}: ${message}`);
   })

   // Leave the room
  socket.on('disconnect', () => {
    console.log('user disconnected');
    io.to(socket.room).emit('message', `${socket.username} has left this room`);
    socket.leave(socket.room);
  });
});

// Starting the server and listening on port 3000
http.listen(3001, function(){
   console.log('listening on *:3001');
});