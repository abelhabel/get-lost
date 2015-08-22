var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io', { 
  rememberTransport: false, 
  transports: ['WebSocket', 'AJAX long-polling'] 
})(http);

http.listen(process.env.PORT || 3000, function(){
  // console.log('listening on *:3000');
});
// memory leaks testing
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
      arr.push(go.playersTable[storedSocket.clientPlayer.id]);
    }
  });
  return arr;
}

function broadcastNearBy(thisPlayer, topic, msg) {
  var arr = [];
  go.sockets.forEach(function(storedSocket) {
    if(storedSocket.connected && storedSocket.clientPlayer.id != thisPlayer.id && 
      Math.abs(thisPlayer.posx - storedSocket.clientPlayer.posx) < 1600 &&
      Math.abs(thisPlayer.posy - storedSocket.clientPlayer.posy) < 1600) {
      storedSocket.emit(topic, msg);
    }
  });
  return arr;
}

function getOtherSocketsNearBy(thisPlayer) {
  var arr = [];
  go.sockets.forEach(function(storedSocket) {
    if(storedSocket.connected && storedSocket.clientPlayer.id != thisPlayer.id && 
      Math.abs(thisPlayer.posx - storedSocket.clientPlayer.posx) < 1600 &&
      Math.abs(thisPlayer.posy - storedSocket.clientPlayer.posy) < 1600) {
      arr.push(storedSocket);
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
  go.playersTable[socket.clientPlayer.id] = socket.clientPlayer;
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

  socket.on('player rotation', function(msg){
    go.playersTable[msg.id].rotation = msg.rotation;
    broadcastNearBy(msg, 'player rotation', msg);
  })

  socket.on('move', function(msg) {
    if(go.playersTable.hasOwnProperty(msg.id)){
      go.playersTable[msg.id].posx = msg.posx;
      go.playersTable[msg.id].posy = msg.posy;
      broadcastNearBy(msg, 'player speed', msg);
    }
  });

  socket.on('sync position', function(msg) {
    socket.broadcast.emit('sync position', msg)
  })

  socket.on('get new world tile', function(msg) {

    var storedObjects = go.workspace.getGridTilesOnObject(msg);
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
      if(obj.mineralCapacity > 0) {
        storedObject.updateSize(obj.size - 0.01);
        storedObject.mineralCapacity -= 0.1;
      
        storedObject.minable = true;
        storedObject.isMined = true;
        io.emit('mining', storedObject);
      }
    }
  });
});


