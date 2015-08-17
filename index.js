var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var go = require('world/populate.js');
var helpers = require(__dirname + "/public/helpers.js");

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
  console.log(go.workspace.width);
});

app.get('/public/*', function(req, res) {
  console.log(req.originalUrl);
  res.sendFile(__dirname + req.originalUrl);
});

io.on('connection', function(socket) {
  console.log('a user connected');
  io.emit('chat message', 'A new user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  socket.on('player shoot', function(msg) {
    // console.log(msg);
  });

  socket.on('taking damage', function(msg) {
    // console.log(msg);
  })

  socket.on('move', function(obj) {
    var objects = go.workspace.getGridTilesOnObject(obj);
    socket.emit('world section', objects);
  });

  socket.on('death', function(obj) {
    var tile = go.workspace.getGridTile(obj.posx, obj.posy);
    var storedObject = helpers.getObjectOnId(tile, obj.id);
    storedObject.dead = true;
    console.log(storedObject);
  })
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});