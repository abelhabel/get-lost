var fs = require('fs');
var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);
server.listen(process.env.PORT || 3000, function(){
  // console.log('listening on *:3000');
});
var io = require('socket.io', { 
  rememberTransport: false, 
  transports: ['WebSocket', 'AJAX long-polling'] 
})(server);

var go = require('world/populate.js');
// var Bosses = require("bosses/bosses.js");
var Worlds = {};
Worlds["0"] = new go();
Worlds["0"].id = 0;
Worlds["0"].populateWorld();
var Helpers = require(__dirname + "/public/helpers.js");
var Player = require(__dirname + "/public/objects/player.js");
var BlackHole = require(__dirname + "/public/objects/blackhole.js");
var Hunter = require(__dirname + "/public/objects/hunter.js");
var MovementPatterns = require(__dirname + "/public/movementpatterns.js");
function addPlayer(world, player) {
  if(world.playersTable.hasOwnProperty(player.id)) return;

  world.playersTable[player.id] = player;
}

function removePlayer(player) {
  var world, storedPlayer;
  for(worldKey in Worlds) {
    world = Worlds[worldKey];
    for(playerKey in world.playersTable) {
      storedPlayer = world.playersTable[playerKey];
      if(storedPlayer.id == player.id) {
        delete world.playersTable[player.id];
      }
    }
  }
}

function getOtherPlayersThan(thisPlayer) {
  var arr = [];
  var players = Worlds[thisPlayer.worldId].playersTable;
  for(key in players) {
    if(thisPlayer.id != players[key].id) {
      arr.push(players[key]);
    }
  }
  return arr;
}

function broadcastToWorld(thisPlayer, socket, topic, msg) {
  var players = Worlds[thisPlayer.worldId].playersTable;
  for(key in players) {
    if(players[key].socketId != thisPlayer.socketId)
      socket.broadcast.to(players[key].socketId).emit(topic, msg);
  }
}

function broadcastNearBy(thisPlayer, socket, topic, msg) {
  var players = Worlds[thisPlayer.worldId].playersTable;
  for(key in players) {
    if(Math.abs(thisPlayer.posx - players[key].posx) < 1600 &&
      Math.abs(thisPlayer.posy - players[key].posy) < 1600 &&
      players[key].socketId != thisPlayer.socketId) {
      socket.broadcast.to(players[key].socketId).emit(topic, msg);
    }
  }
}

function getOtherSocketsNearBy(world, thisPlayer) {
  var arr = [];
  world.sockets.forEach(function(storedSocket) {
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
  function emitWorldTile(msg) {
    var storedObjects = Worlds[msg.worldId].workspace.getGridTilesOnObject(msg);
    socket.emit('world section', storedObjects);
  }
  function emitOtherPlayers(msg) {
    var otherPlayers = getOtherPlayersThan(msg);
    socket.emit('add other players', otherPlayers);
  }
  // Initial connection of a new player
  // 1. create player
  var player = new Player(50000, 50000, 25);
  player.socketId = socket.id;
  player.worldId = 0;
  socket.clientPlayer = player;
  // 2. store socket
  Worlds[player.worldId].sockets.push(socket);
  Worlds[player.worldId].playersTable[player.id] = player;
  // 3. return player
  socket.emit('new player', player);

  // 4. broadcast player
  broadcastToWorld(player, socket, 'add player', player);
  // socket.broadcast.emit('add player', player);

  // 5. return all other players
  emitOtherPlayers(player);
  emitWorldTile(player);

  socket.on('new world', function(msg) {
    var newWorld;
    console.log('incoming player world id:', msg.worldId);
    broadcastToWorld(msg, socket, 'remove player', msg);
    
    if(Worlds.hasOwnProperty(msg.worldId + 1)) {
      newWorld = Worlds[msg.worldId + 1];
    }else {
      newWorld = new go();
      newWorld.populateWorld();
      Worlds[Object.keys(Worlds).length] = newWorld;
      newWorld.id = Object.keys(Worlds).length - 1;
    }
    msg.worldId += 1;
    Worlds[msg.worldId].playersTable[msg.id] = msg;
    socket.emit('set world id', msg.worldId);
    delete Worlds[msg.worldId - 1].playersTable[msg.id];
    Worlds[msg.worldId].sockets.push(socket);
    
    addPlayer(newWorld, msg); 
    socket.emit('new world', msg);
    emitWorldTile(msg);
    // 4. broadcast player to world
    broadcastToWorld(msg, socket, 'add player', msg);
    // 5. return all other players in world
    emitOtherPlayers(msg);
  });

  console.log('a user connected' + socket.handshake.address);
  // send this player to all other already connected players
  

  socket.on('disconnect', function() {
    console.log('user disconnected');
    removePlayer(socket.clientPlayer);
    socket.broadcast.emit('remove player', socket.clientPlayer);
  });

  socket.on('player shoot', function(msg) {
    broadcastNearBy(msg, socket, 'player shoot', msg);
    // socket.broadcast.emit('player shoot', msg);
  });

  socket.on('player rotation', function(msg){
    if(!Worlds[msg.worldId].playersTable.hasOwnProperty(msg.id)) return;
    Worlds[msg.worldId].playersTable[msg.id].rotation = msg.rotation;
    broadcastNearBy(msg, socket, 'player rotation', msg);
  })

  socket.on('move', function(msg) {
    var player = Worlds[msg.worldId].playersTable[msg.id];
    if(!player) return;
    player.posx = msg.posx;
    player.posy = msg.posy;
    player.vx = msg.vx;
    player.vy = msg.vy;
    broadcastNearBy(msg, socket, 'player speed', msg);
  });

  socket.on('sync position', function(msg) {
    var player = Worlds[msg.worldId].playersTable[msg.id];
    if(!player) return;
    player.posx = msg.posx;
    player.posy = msg.posy;
    player.vx = msg.vx;
    player.vy = msg.vy;
    broadcastToWorld(msg, socket, 'sync position', msg);
    // socket.broadcast.emit('sync position', msg)
  })

  socket.on('get new world tile', function(msg) {

    emitWorldTile(msg);
    broadcastNearBy(msg, socket, 'sync position', msg);
    // broadcastToWorld(Worlds[socket.clientPlayer.worldId], msg, 'sync position', msg);
    // var otherPlayers = getOtherPlayersThan(Worlds[socket.clientPlayer.worldId], socket.clientPlayer);
    // socket.emit('add other players', otherPlayers);
  });

  socket.on('take damage', function(msg) {
    if(msg.obj.cotr == "Player") {
      storedObject = Worlds[msg.worldId].playersTable[msg.obj.id];
    }else {
      storedObject = Worlds[msg.worldId].idTable[msg.obj.id];
    }
    if(storedObject) {
      storedObject.currentHP -= msg.damage;
      broadcastNearBy(msg, socket, 'update object', msg);
    }
  });

  socket.on('death', function(msg) {
    var storedObject = Worlds[msg.worldId].idTable[msg.obj.id];
    if(!storedObject) return;
    storedObject.dead = true;
    storedObject.checkCollision = false;
    if(storedObject.cotr == "CircleBoss" || storedObject.cotr == "PolygonBoss") {
      var blackHole = new BlackHole(msg.obj.posx, msg.obj.posy, msg.obj.r);
      Worlds[msg.worldId].idTable[blackHole.id] = blackHole;
      Worlds[msg.worldId].workspace.addToGrid(blackHole);
      console.log('added black hole');
      socket.emit('add object', blackHole);
      broadcastNearBy(msg.player, socket, 'add object', blackHole);
    }
  });

  socket.on('mining', function(msg) {

    var storedObject = Worlds[msg.worldId].idTable[msg.id];
    if(storedObject && storedObject.cotr == 'Planet') {
      if(storedObject.mineralCapacity > 0) {
        storedObject.updateSize(storedObject.size - 0.01);
        storedObject.mineralCapacity -= 0.1;
      
        storedObject.minable = true;
        storedObject.isMined = true;
        if(storedObject.mineralCapacity <= 0) {
          storedObject.minable = false;
        }
        
        io.emit('mining', storedObject);
        if(!storedObject.hunterReleased) {
          storedObject.hunterReleased = true;
          var keys = Object.keys(MovementPatterns);
          var hunter = new Hunter(storedObject.posx, storedObject.posy - 300, 25, MovementPatterns[ keys[Math.floor(Math.random() * keys.length) ]]);
          // Worlds[msg.worldId].workspace.addToGrid(hunter);
          socket.emit('add object', hunter);
        }

        if(Math.random() > 0.1 && !storedObject.hasAdventure) {
          storedObject.hasAdventure = true;

          fs.readFile(__dirname + "/data/adventures/corpse.json", function(err, data) {
            socket.emit('adventure', data.toString());
          });
          

        }
      }
    }
  });
});


