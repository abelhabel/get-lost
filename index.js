var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var go = require('world/populate.js');
var Bosses = require("bosses/bosses.js");

var Helpers = require(__dirname + "/public/helpers.js");
var Player = require(__dirname + "/public/objects/player.js");


function addPlayer(player) {
  if(go.playersTable.hasOwnProperty(player.id)) return;

  go.playersTable[player.id] = player;
}

function removePlayer(player) {
  if(go.playersTable.hasOwnProperty(player.id)) {
    delete go.playersTable[player.id];
  }
}


app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/public/*', function(req, res) {
  console.log(req.originalUrl);
  res.sendFile(__dirname + req.originalUrl);
});

io.on('connection', function(socket) {
  console.log('a user connected' + socket.handshake.address);
  var player = new Player(50000, 50000, 25);
  addPlayer(player);
  // go.workspace.addToGrid(player);

  socket.clientPlayer = player;
  socket.emit('new player', player);
  socket.emit('add other players', go.playersTable);


  socket.broadcast.emit('add player', player);

  

  socket.on('disconnect', function() {
    console.log('user disconnected');
    removePlayer(socket.clientPlayer);
    socket.broadcast.emit('remove player', socket.clientPlayer);
  });

  socket.on('player shoot', function(msg) {
    // console.log(msg);
  });

  socket.on('move', function(msg) {
    var player = msg.player;
    player.updateCounter = Date.now();
    go.playersTable[player.id] = player;
    socket.broadcast.emit('player position', player);

    var camera = msg.camera;
    var storedObjects = go.workspace.getGridTilesOnObject(camera);
    socket.emit('world section', storedObjects);
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
    var storedObject = go.idTable[obj.id];
    if(obj && obj.cotr == 'Planet') {
      storedObject.updateSize(obj.size);
      storedObject.mineralCapacity = obj.mineralCapacity;
      storedObject.minable = obj.minable;
      storedObject.isMined = obj.isMined;
      socket.broadcast.emit('mining', storedObject);
    }
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});