// populateWorld();
var player;
// var player = new Player(50000, 50000, 100);
// player.followers.push(go.camera);
// go.workspace.addToGrid(player);
go.backgroundImage = new Background();
go.testing = false;
if(!go.testing) {
  // send new player to server only once
  socket.on('new player', function(msg) {
    player = Helpers.copyKeys(new Player(), msg);
    go.camera.follow = player;
    go.workspace.addToGrid(player);
    startGame();
    setUI();
  });
  printOnce = false;
  socket.on('world section', function(msg) {

    function create(obj) {
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

    msg.forEach(function(obj) {
      if(go.idTable.hasOwnProperty(obj.id)) return;
      var shape = create(obj);
      go.idTable[shape.id] = shape;
      go.workspace.addToGrid(shape);
      if(shape.follow) {
        var tile = go.workspace.getGridTile(shape.follow.posx, shape.follow.posy);
        var match = Helpers.getObjectOnId(tile, shape.follow.id);
        if(match) shape.follow = match
      }
    })
  });

  socket.on('mining', function(obj) {
    var tile = go.workspace.getGridTile(obj.posx, obj.posy);
    var storedObject = Helpers.getObjectOnId(tile, obj.id);
    if(obj.cotr == 'Planet') {
      storedObject.updateSize(obj.size);
      storedObject.mineralCapacity = obj.mineralCapacity;
      storedObject.minable = obj.minable;
      storedObject.isMined = obj.isMined;
    }
  });

  socket.on('connect2', function(msg){
    console.log(msg);
  });
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
  socket.emit('move', go.camera);
}
function startGame() {
  if(go.testing) {
    testGalaxyLoad(400, 40, 200);
    objectsSync(10);

  }else {
    go.collisionTimer = setInterval(collisionLoop, 10);
    go.miningTimer = setInterval(miningLoop, 100);
    go.positionTimer = setInterval(positionLoop, 16);
    TabMenu.miniMap.open();
    TabMenu.miniMap.close();
    go.miniMap.context.fillStyle = "#AAAAAA";
    go.miniMap.context.fillRect(0, 0, TabMenu.miniMap.width, TabMenu.miniMap.height);
    draw();
  }
}