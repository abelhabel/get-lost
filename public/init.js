// populateWorld();
var player;
// var player = new Player(50000, 50000, 100);
// player.followers.push(go.camera);
// go.workspace.addToGrid(player);
go.backgroundImage = new Background();
go.testing = false;

function createGameObject(obj) {
  var newObj = {};
  if(obj.cotr == 'Planet')
    newObj = Helpers.copyKeys(new Planet(), obj);

  if(obj.cotr == "Guardian") {
    newObj = Helpers.copyKeys(new Guardian(), obj);
    newObj.setPoints();
  }

  if(obj.cotr == "Player" && obj.id != player.id)
    newObj = Helpers.copyKeys(new Player(), obj);

  if(obj.cotr == "PolygonBoss") {
    newObj = Helpers.copyKeys(new PolygonBoss(), obj);
    newObj.setRadian();
  }

  if(obj.cotr == "CircleBoss") {
    newObj = Helpers.copyKeys(new CircleBoss(), obj);
  }

  if(obj.cotr == "Circle") {
    newObj = Helpers.copyKeys(new Circle(), obj);
  }

  if(obj.cotr == "BlackHole") {
    newObj = Helpers.copyKeys(new BlackHole(), obj);
  }

  if(obj.cotr == "Hunter") {
    newObj = Helpers.copyKeys(new Hunter(), obj);
    console.log("hunter added", newObj.posx, newObj.posy);
    newObj.ox = go.camera.xmin;
    newObj.oy = go.camera.ymin;
  }

  return newObj;
}


if(!go.testing) {
  // send new player to server only once
  socket.on('new player', function(msg) {
    player = Helpers.copyKeys(new Player(), msg);
    go.camera.follow = player;
    go.currentWorldTile = go.workspace.getGridTile(player.posx, player.posy);
    player.setEngineFuel("Cermonophen");
    go.playersTable[player.id] = player;
    setUI();
    console.log('got player');
  });

  socket.on('new world', function(msg) {
    go.workspace = new Workspace(1e5, 1e5, go.gridSize, go.gridSize);

    go.playersTable = {};
    go.playersTable[player.id] = player;

    socket.emit('get new world tile', player);
  });

  printOnce = false;
  socket.on('player speed', function(msg) {
    if(go.playersTable.hasOwnProperty(msg.id)) {
      go.playersTable[msg.id].vx = msg.vx;
      go.playersTable[msg.id].vy = msg.vy;
    }
  });

  socket.on('player rotation', function(msg) {
    if(go.playersTable.hasOwnProperty(msg.id)) {
      go.playersTable[msg.id].rotation = msg.rotation;
    }
  });

  socket.on('sync position', function(msg) {
    if(go.playersTable.hasOwnProperty(msg.id)) {
      go.playersTable[msg.id].vx = msg.vx;
      go.playersTable[msg.id].vy = msg.vy;
      go.playersTable[msg.id].posx = msg.posx;
      go.playersTable[msg.id].posy = msg.posy;
    }
  })

  socket.on('add player', function(msg) {
    newPlayer = Helpers.copyKeys(new Player(), msg);
    newPlayer.setBoundingBox();
    
    go.playersTable[newPlayer.id] = newPlayer;
    console.log('New player connected: ' + newPlayer.id, newPlayer.vx, newPlayer.vy)
  });

  socket.on('add other players', function(msg) {
    var newPlayer;
    for(key in msg) {
      newPlayer = msg[key];
      go.playersTable[newPlayer.id] = Helpers.copyKeys(new Player(), newPlayer);
      console.log('added player: ' + newPlayer.id, newPlayer.posx, newPlayer.posy);
    }
    
  });
  socket.on('remove player', function(msg) {
    delete go.playersTable[msg.id];
    console.log("Player disconnected: " + msg.id);
  });

  socket.on('add object', function(msg) {
    go.workspace.addToGrid(createGameObject(msg));
  })

  socket.on('update object', function(msg) {
    Helpers.copyKeys(go.idTable[msg.id], msg);
  })

  socket.on('set world id', function(worldId) {
    player.worldId = worldId;
  });

  socket.on('world section', function(msg) {
    msg.forEach(function(obj) {
      if(go.idTable.hasOwnProperty(obj.id)) {
        if(obj.cotr == "Planet") {
          go.idTable[obj.id].isMined = obj.isMined;
          go.idTable[obj.id].updateSize(obj.size);
        }else
        if(obj.cotr == "Guardian") {
          go.idTable[obj.id].currentHP = obj.currentHP;
        }
        return;
      }
      // if(shape.cotr == "Player") return;
      var shape = createGameObject(obj);
      go.idTable[shape.id] = shape;
      if(shape.cotr != "Player") {
        go.workspace.addToGrid(shape);
      }
      if(shape.follow) {
        shape.follow = go.idTable[shape.follow.id + ""];
      }
    })
  });

  socket.on('mining', function(obj) {
    var storedObject = go.idTable[obj.id];
    if(storedObject && storedObject.cotr == 'Planet') {
      player.minerals[obj.mineral.name] += 0.1;
      storedObject.updateSize(obj.size);
      storedObject.mineralCapacity = obj.mineralCapacity;
      storedObject.minable = obj.minable;
      storedObject.isMined = obj.isMined;
    }
  });

  socket.on('adventure', function(msg) {
    go.sounds.scan.play();
    go.currentAdventure = JSON.parse(msg);
    go.an.planet = player.currentlyMining;
    setTimeout(function() {
      go.sounds.scan.stop();
      if(!player.currentlyMining && player.currentlyMining != go.an.planet) return;
      
      go.an.style.display = "block";
      go.an.style.top = "100px";
      go.an.style.right = "300px";
      go.an.textContent = "You found something on " + go.an.planet.name + ". Click to explore.";
      
      go.an.addEventListener('mousedown', startAdventure, false);
    }, 3000 + Math.ceil(Math.random() * 4000));
    console.log(JSON.parse(msg));
  });

  socket.on('player shoot', function(msg) {
    go.playersTable[msg.id].shoot();
  })
}
// ui
function setUI() {
  var step = 0;
  var padding = 10;
  var margin = 30;
  Object.keys(Minerals.minerals).forEach(function(key) {
    var w = 64;
    var h = 64;
    var x = margin + (w * step) + step * padding;
    var y = go.uiScreen.height - margin - h;
    go.ui.minerals.push(
      new Icon(Minerals.minerals[key].color, 
          Minerals.minerals[key].name, 
          player.minerals[key],
          x, y, w, h));
    step += 1;
  });
}

function positionLoop() {
  if(player.vx != 0 || player.vy != 0) {
    socket.emit('move', player);
  }
  go.positionLoopTimer += 1;
  if(go.positionLoopTimer > 100) {
    go.positionLoopTimer = 0;
    socket.emit('sync position', player);
  }
}

function checkSprites() {
  go.spritesLoaded += 1;
  if(go.spritesLoaded == go.totalSprites) {
    // startGame();
  }
}
function checkSounds() {
  go.soundsLoaded += 1;
}
function startGame() {
  console.log(go.spritesLoaded, go.totalSprites, go.soundsLoaded, go.totalSounds);
  if(go.testing) {
    testGalaxyLoad(400, 40, 200);
    objectsSync(10);

  }else
  if(player && player.hasOwnProperty('id') && go.spritesLoaded == go.totalSprites) {
    go.collisionTimer = setInterval(collisionLoop, 8);
    go.miningTimer = setInterval(miningLoop, 100);
    go.positionTimer = setInterval(positionLoop, 100);
    go.mainMenu.style.display = "none";
    console.log('start game');
    HUD.miniMap.open();
    HUD.miniMap.close();
    go.miniMap.context.fillStyle = "#AAAAAA";
    draw();
    go.sounds.intro.play();
  }
}