var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io', { 
  rememberTransport: false, 
  transports: ['WebSocket', 'Flash Socket', 'AJAX long-polling'] 
})(http);

var go = require('world/populate.js');
var Bosses = require("bosses/bosses.js");

var Helpers = require(__dirname + "/public/helpers.js");
var Player = require(__dirname + "/public/objects/player.js");


function addPlayer(player) {
  if(go.playersTable.hasOwnProperty(player.id)) return;

  go.playersTable[player.id] = player;
}

function removePlayer(player) {
  delete go.playersTable[player.id];
}

function getOtherPlayersThan(thisPlayer) {
  var arr = [];
  go.sockets.forEach(function(storedSocket) {
    if(storedSocket.connected && storedSocket.clientPlayer.id != thisPlayer.id) {
      arr.push(storedSocket.clientPlayer);
    }
  });
  return arr;
}

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/public/*', function(req, res) {
  console.log(req.originalUrl);
  res.sendFile(__dirname + req.originalUrl);
});

io.on('connection', function(socket) {
  // Initial connection of a new player
  // 1. create player
  socket.clientPlayer = new Player(50000, 50000, 25);
  socket.clientPlayer = socket.clientPlayer;

  // 2. store socket
  go.sockets.push(socket);

  // 3. return player
  socket.emit('new player', socket.clientPlayer);

  // 4. broadcast player
  socket.broadcast.emit('add player', socket.clientPlayer);

  // 5. return all other players
  var otherPlayers = getOtherPlayersThan(socket.clientPlayer);
  socket.emit('add other players', otherPlayers);
  

  console.log('a user connected' + socket.handshake.address);
  // send this player to all other already connected players
  

  socket.on('disconnect', function() {
    console.log('user disconnected');
    removePlayer(socket.clientPlayer);
    socket.broadcast.emit('remove player', socket.clientPlayer);
  });

  socket.on('player shoot', function(msg) {
    socket.broadcast.emit('player shoot', msg);
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


http.listen(process.env.PORT || 3000, function(){
  // console.log('listening on *:3000');
});