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

  return newObj;
}


if(!go.testing) {
  // send new player to server only once
  socket.on('new player', function(msg) {
    player = Helpers.copyKeys(new Player(), msg);
    go.camera.follow = player;
    player.currentWorldTile = go.workspace.getGridTile(player.posx, player.posy);
    player.setEngineFuel("Cermonophen");
    go.playersTable[player.id] = player;
    startGame();
    setUI();
  });
  printOnce = false;
  socket.on('player position', function(msg) {
    if(go.playersTable.hasOwnProperty(msg.id)) {
      go.playersTable[msg.id].posx = msg.posx;
      go.playersTable[msg.id].posy = msg.posy;
    }
  })

  socket.on('add player', function(msg) {
    newPlayer = Helpers.copyKeys(new Player(), msg);
    newPlayer.setBoundingBox();
    
    go.playersTable[newPlayer.id] = newPlayer;

  });

  socket.on('add other players', function(msg) {
    var newPlayer;
    for(key in msg) {
      newPlayer = msg[key];
      go.playersTable[newPlayer.id] = Helpers.copyKeys(new Player(), newPlayer);
    }
    
  });

  socket.on('remove player', function(msg) {
    delete go.playersTable[msg.id];
  });

  socket.on('world section', function(msg) {
    // var startTime = window.performance.now();
    msg.forEach(function(obj) {
      if(go.idTable.hasOwnProperty(obj.id)) {
        if(obj.cotr == "Planet") {
          go.idTable[obj.id].isMined = obj.isMined;
          go.idTable[obj.id].updateSize(obj.size);
        }
        return;
      }
      var shape = createGameObject(obj);
      go.idTable[shape.id] = shape;
      go.workspace.addToGrid(shape);
      if(shape.follow) {
        var tile = go.workspace.getGridTile(shape.follow.posx, shape.follow.posy);
        var match = Helpers.getObjectOnId(tile, shape.follow.id);
        if(match) shape.follow = match
      }
    })
    // var endTime = window.performance.now();
    // console.log(endTime - startTime);
  });

  socket.on('mining', function(obj) {
    var storedObject = go.idTable[obj.id];
    if(storedObject && storedObject.cotr == 'Planet') {
      storedObject.updateSize(obj.size);
      storedObject.mineralCapacity = obj.mineralCapacity;
      storedObject.minable = obj.minable;
      storedObject.isMined = obj.isMined;
    }
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
    socket.emit('move', {camera: go.camera, player: player, timeStamp: Date.now()});
  }
}
function startGame() {
  if(go.testing) {
    testGalaxyLoad(400, 40, 200);
    objectsSync(10);

  }else {
    go.collisionTimer = setInterval(collisionLoop, 8);
    go.miningTimer = setInterval(miningLoop, 100);
    go.positionTimer = setInterval(positionLoop, 8);
    HUD.miniMap.open();
    HUD.miniMap.close();
    go.miniMap.context.fillStyle = "#AAAAAA";
    go.miniMap.context.fillRect(0, 0, HUD.miniMap.width, HUD.miniMap.height);
    draw();
  }
}