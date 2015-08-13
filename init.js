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
    new Planet(x, y);
  }
}

populateWorld();
var player = new Polygon(5000, 5000, 100);
player.followers.push(go.camera);
go.workspace.addToGrid(player);

draw();