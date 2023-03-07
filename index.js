const express = require('express')
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){ 
   res.sendFile('/Users/deeppatel/Desktop/Work/chat-app/index.html');
});

var clients = 0;

io.on('connection', function(socket){
   clients++;
   socket.emit('newclientconnect',{ description: 'Hey, welcome!'});
   socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})
   socket.on('disconnect', function () {
      clients--;
      socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})
   });
});

http.listen(3000, function(){
   console.log('listening on *:3000');
});