var fs = require('fs');
var Firebase = require("firebase");
var fbSecret = 'bnUlHC7KpcNxbnI2H13Y9rZFVw1hQu9wnOrBC9A9';
var bcrypt = require('bcrypt-nodejs');
var db = new Firebase("https://get-lost.firebaseio.com/");
db.authWithCustomToken(fbSecret, dbAuth);
function dbAuth(msg) {
  if(msg === null) {
    console.log('connected to firebase');
  }else {
    console.log('could not connect to firebase');
  }
}
var adventureShift = 1;
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
Worlds["0"].populateWorld(0);
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
      io.sockets.connected[players[key].socketId].emit(topic, msg);
    }
  }
}

function emitNearBy(thisPlayer, socket, topic, msg) {
  var players = Worlds[thisPlayer.worldId].playersTable;
  for(key in players) {
    if(Math.abs(thisPlayer.posx - players[key].posx) < 1600 &&
      Math.abs(thisPlayer.posy - players[key].posy) < 1600) {
      io.sockets.connected[players[key].socketId].emit(topic, msg);
    }
  }
}

function getPlayerOnSocket(world, socketId) {
  for(key in world.playersTable) {
    if(world.playersTable[key].socketId == socketId) {
      return world.playersTable[key];
    }
  }
  return false;
}

function emitToWorld(world, socket, topic, msg) {
  var player;
  for(key in world.playersTable) {
    player = world.playersTable[key];
    socket.broadcast.to(player.socketId).emit(topic, msg);
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

function removeDisconnectedPlayers() {
  var world, storedPlayer, socket;
  for(worldKey in Worlds) {
    world = Worlds[worldKey];
    for(playerKey in world.playersTable) {
      storedPlayer = world.playersTable[playerKey];
      socket = io.sockets.connected[storedPlayer.socketId];
      if(!socket) {
        delete world.playersTable[playerKey];
      }
    }
  }
}

function validate(obj) {
  if(obj && obj.hasOwnProperty('worldId')) {
    var world = Worlds[obj.worldId];
    
    if(obj.cotr == "Player") {
      return world.playersTable[obj.id];
    }else {
      return world.idTable[obj.id];
    }
  }

  return false;
}
function createBlackHole(obj, socket) {
  var blackHole = new BlackHole(obj.posx, obj.posy, obj.r);
  Worlds[obj.worldId].idTable[blackHole.id] = blackHole;
  Worlds[obj.worldId].workspace.addToGrid(blackHole);
  emitNearBy(obj, socket, 'add object', blackHole);
}

function createHunter(storedObject, socket) {
  var keys = Object.keys(MovementPatterns);
  var hunter = new Hunter(storedObject.posx, storedObject.posy - 300, 25, MovementPatterns[ keys[Math.floor(Math.random() * keys.length) ]]);
  hunter.id = hunter.team = Helpers.getNextId();
  hunter.worldId = storedObject.worldId;
  Worlds[storedObject.worldId].idTable[hunter.id] = hunter;
  Worlds[storedObject.worldId].workspace.addToGrid(hunter);
  socket.emit('add object', hunter);
  broadcastNearBy(storedObject, socket, 'add object', hunter);
}


app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/public/*', function(req, res) {
  res.sendFile(__dirname + req.originalUrl);
});

function getUser(username, callback) {
  db.child('users').child(username).once('value', callback);
}

function savePlayer(username, thisPlayer, callback) {
  db.child('users').child(username).update({
    player: {
      posx: thisPlayer.posx,
      posy: thisPlayer.posy,
      r: thisPlayer.r,
      worldId: thisPlayer.worldId,
      currentHP: thisPlayer.currentHP,
      maxHP: thisPlayer.maxHP,
      xp: thisPlayer.xp || 0
    }
  });
}

function dbClearPlayer(username) {
  db.child('users').child(username).child('player').remove();
}


io.on('connection', function(socket) {
  function emitWorldTile(msg) {
    var storedObjects = Worlds[msg.worldId].workspace.getGridTilesOnObject(msg);
    socket.emit('world section', storedObjects);
  }
  function emitOtherPlayers(msg) {
    var otherPlayers = getOtherPlayersThan(msg);
    socket.emit('add other players', otherPlayers);
  }

  socket.on('get player', function(msg) {

    function initPlayer(player) {
      player.socketId = socket.id;
      player.worldId = 0;
      savePlayer(socket.credentials.username, player);
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
    }
    // Initial connection of a new player
    // 1. create player
    removeDisconnectedPlayers();
    if(socket.credentials) {
      getUser(socket.credentials.username, function(snapshot) {
        if(snapshot.val().player) {
          var player = snapshot.val().player;
          player = Helpers.copyKeys(new Player(), player);
        }else {
          var player = new Player(50000, 50000, 25);
          
        }
        initPlayer(player);
      })
    }else {
      var player = new Player(50000, 50000, 25);
      savePlayer(socket.credentials.username, player, function(){});
      initPlayer(player);
    }
  });
  
  socket.on('logout', function(msg) {
    socket.credentials = null;
  })

  socket.on('login', function(msg) {

    function validateUser(snapshot) {
      if(snapshot.val() !== null) {
        var hashedPassword = snapshot.val().password;
        var match = bcrypt.compareSync(msg.password, hashedPassword);
        if(match) {
          console.log('match');
          socket.emit('login success', msg);
          socket.credentials = msg;
        }else {
          console.log('not matching');
          socket.emit('login fail', true);
        }
      }else{
        socket.emit('login fail', true);
      }
    }
    getUser(msg.username, validateUser);
    // db.child('users').update(users);
  });

  socket.on('signup', function(msg) {
    getUser(msg.username, function(snapshot){
      if(snapshot.val() === null) {
        var users = {};
        users[msg.username] = {
          username: msg.username,
          password: bcrypt.hashSync(msg.password)
        };
        db.child('users').update(users);
        socket.emit('signup success', msg);
        socket.credentials = msg;
      }else {
        socket.emit('signup fail', true);
      }
    });
  });

  socket.on('new world', function(msg) {
    var newWorld;
    broadcastToWorld(msg, socket, 'remove player', msg);
    
    if(Worlds.hasOwnProperty(msg.worldId + 1)) {
      newWorld = Worlds[msg.worldId + 1];
    }else {
      newWorld = new go();
      newWorld.populateWorld(msg.worldId + 1);
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

  // send this player to all other already connected players
  
  socket.on('get players', function(msg) {
    var arr = [];
    for(key in Worlds[msg.worldId].playersTable) {
      arr.push(Worlds[msg.worldId].playersTable[key]);
    }
    socket.emit('get players', arr);
  });

  socket.on('disconnect', function() {
    removePlayer(socket.clientPlayer);
    socket.broadcast.emit('remove player', socket.clientPlayer);
  });

  socket.on('player shoot', function(msg) {
    var sobj = validate(msg);
    if(sobj) {
      broadcastNearBy(sobj, socket, 'player shoot', sobj);
    }
    // socket.broadcast.emit('player shoot', msg);
  });

  socket.on('player rotation', function(msg){
    var sobj = validate(msg);
    if(sobj) {
      sobj.rotation = msg.rotation;
      broadcastNearBy(sobj, socket, 'player rotation', sobj);
    }
  })

  socket.on('move', function(msg) {
    var player = validate(msg);
    if(!player) return;
    player.posx = msg.posx;
    player.posy = msg.posy;
    player.vx = msg.vx;
    player.vy = msg.vy;
    broadcastNearBy(player, socket, 'player speed', player);
  });

  socket.on('sync position', function(msg) {
    var player = validate(msg);
    if(!player) return;
    player.posx = msg.posx;
    player.posy = msg.posy;
    player.vx = msg.vx;
    player.vy = msg.vy;
    broadcastToWorld(player, socket, 'sync position', player);
    savePlayer(socket.credentials.username, player);
  })

  socket.on('get new world tile', function(msg) {
    var sobj = validate(msg);
    emitWorldTile(sobj);
    broadcastNearBy(sobj, socket, 'sync position', sobj);
  });

  socket.on('update grid', function(msg) {
    var sobj = Worlds[msg.worldId].idTable[msg.id];
    var initialX = sobj.posx;
    var initialY = sobj.posy;
    var updatedObj = Helpers.copyKeys(sobj, msg);
    Worlds[msg.worldId].workspace.updateGrid(initialX, initialY, updatedObj);
  });


  socket.on('take damage', function(msg) {
    var attacker = validate(msg.attacker);
    var defender = validate(msg.defender);
    if(!defender || !attacker) return;
    var player = getPlayerOnSocket(Worlds[defender.worldId], socket.id);

    if(defender) {
      defender.currentHP -= msg.damage;
    }

    if(defender.currentHP <= 0) {
      defender.dead = true;
      if(defender.id == player.id) {
        socket.emit('game over');
        dbClearPlayer(socket.credentials.username);
        removePlayer(player);
      }else {
        if(defender.cotr == "CircleBoss") {
          createBlackHole(defender, socket);
        }
        attacker.xp += defender.xp || defender.maxHP || 1;
        // socket.emit('update object', attacker);
        emitNearBy(player, socket, 'update dead', defender);
        emitNearBy(player, socket, 'update xp', attacker);
      }
    }
    // socket.emit('update object', defender);
    emitNearBy(player, socket, 'update hp', defender);
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
          createHunter(storedObject, socket);
        }

        if(!storedObject.hasAdventure) {
          storedObject.hasAdventure = true;
          adventureShift *= (-1);
          var fileName = adventureShift > 0 ? "corpse.json" : "crashed-space-ship.json";
          fs.readFile(__dirname + "/data/adventures/" + fileName, function(err, data) {
            socket.emit('adventure', data.toString());
          });
          

        }
      }
    }
  });
});


