var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var go = require('world/populate.js');
var Bosses = require("bosses/bosses.js");

var Helpers = require(__dirname + "/public/helpers.js");
var Player = require(__dirname + "/public/objects/player.js");

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/public/*', function(req, res) {
  console.log(req.originalUrl);
  res.sendFile(__dirname + req.originalUrl);
});

io.on('connection', function(socket) {
  console.log('a user connected' + socket.handshake.address);
  io.emit('connect2', 'A new user connected');
  var player = new Player(50000, 50000, 25);
  go.workspace.addToGrid(player);

  socket.clientPlayer = player;
  console.log('connecting', socket.clientPlayer);
  socket.emit('new player', player);

  socket.on('disconnect', function() {
    console.log('user disconnected');
    var player = socket.clientPlayer;
    var tile = go.workspace.getGridTilesOnObject(socket.clientPlayer);
    var storedObject = Helpers.getObjectOnId(tile, player.id);
    go.workspace.removeFromGrid(player);
    console.log('disconnecting', socket.clientPlayer);
  });

  socket.on('player shoot', function(msg) {
    // console.log(msg);
  });

  socket.on('move', function(obj) {
    var objects = go.workspace.getGridTilesOnObject(obj);
    socket.emit('world section', objects);
  });

  socket.on('take damage', function(obj) {
    var tile = go.workspace.getGridTile(obj.posx, obj.posy);
    var storedObject = Helpers.getObjectOnId(tile, obj.id);
    storedObject.currentHP = obj.currentHP;
  });

  socket.on('death', function(obj) {
    var tile = go.workspace.getGridTile(obj.posx, obj.posy);
    var storedObject = Helpers.getObjectOnId(tile, obj.id);
    storedObject.dead = true;
    storedObject.checkCollision = false;
  });

  socket.on('mining', function(obj) {
    var tile = go.workspace.getGridTile(obj.posx, obj.posy);
    var storedObject = Helpers.getObjectOnId(tile, obj.id);
    if(obj.cotr == 'Planet') {
      storedObject.updateSize(obj.size);
      storedObject.mineralCapacity = obj.mineralCapacity;
      storedObject.minable = obj.minable;
      storedObject.isMined = obj.isMined;
      io.emit('size change', storedObject);
    }
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});