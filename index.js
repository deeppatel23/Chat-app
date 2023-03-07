const express = require('express')
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){ 
   res.sendFile('/Users/deeppatel/Desktop/Work/chat-app/index.html');
});

//Whenever someone connects this gets executed
io.on('connection', function(socket){
   console.log('A user connected');

   // Send a message after a timeout of 4 seconds
   setTimeout(function(){
      socket.send('User is inactive for 4 seconds');
   }, 4000);

   
   //Whenever someone disconnects this piece of code executed
   socket.on('disconnect', function () {
      console.log('A user disconnected');
   });
});

http.listen(3000, function(){
   console.log('listening on *:3000');
});