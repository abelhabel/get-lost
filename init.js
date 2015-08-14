function populateWorld() {
  Planet.prototype = new GameObject();
  var keys = Object.keys(go.workspace.grid);
  var key;
  var range = go.workspace.gridSize;
  for(var i = 0; i < keys.length; i += 1 ) {
    key = keys[i];
    var xy = key.split(':');
    var baseX = parseInt(xy[0]);
    var baseY = parseInt(xy[1])
    var x = baseX + parseInt(Math.random() * range);
    var y = baseY + parseInt(Math.random() * range);
    if(i % 2 == 0) {
      go.workspace.addToGrid(new Planet(x, y));
      // go.workspace.addToGrid(new Star(x, y));
    }else{
      go.workspace.addToGrid(new Planet(x, y));
      // go.workspace.addToGrid(new Star(x, y, Math.round(Math.random() * 100)));
    } 
  }
}

populateWorld();
var player = new Polygon(50000, 50000, 100);
player.followers.push(go.camera);
player.checkCollision = true;
go.workspace.addToGrid(player);
go.backgroundImage = new Background();

go.collisionTimer = setInterval(collisionLoop, 10);
draw();