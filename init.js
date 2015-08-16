

function populateWorld() {
  var keys = Object.keys(go.workspace.grid);
  var key, planet, guardian;
  var rangeX = go.workspace.gridSizeX;
  var rangeY = go.workspace.gridSizeY;
  for(var i = 0; i < keys.length; i += 1 ) {
    key = keys[i];
    var xy = key.split(':');
    var baseX = parseInt(xy[0]);
    var baseY = parseInt(xy[1])
    var x = baseX + parseInt(Math.random() * rangeX);
    var y = baseY + parseInt(Math.random() * rangeY);

    if(i % 2 == 0) {
      planet = new Planet(x, y)
      guardian = new Guardian(x, y, planet);
      go.workspace.addToGrid(planet);
      go.workspace.addToGrid(guardian);
      // go.workspace.addToGrid(new Star(x, y));
    }else{
      go.workspace.addToGrid(new Planet(x, y));
      // go.workspace.addToGrid(new Star(x, y, Math.round(Math.random() * 100)));
    } 
  }
}

populateWorld();
var player = new Player(50000, 50000, 100);
player.followers.push(go.camera);
go.workspace.addToGrid(player);
go.backgroundImage = new Background();

// ui
var step = 0;
var padding = 10;
var margin = 30;
Object.keys(minerals).forEach(function(key) {
  var w = 64;
  var h = 64;
  var x = margin + (w * step) + step * padding;
  var y = go.uiScreen.height - margin - h;
  go.ui.minerals.push(
    new Icon(minerals[key].color, 
        minerals[key].name, 
        player.minerals[key],
        x, y, w, h));
  step += 1;
});



go.collisionTimer = setInterval(collisionLoop, 10);
go.miningTimer = setInterval(miningLoop, 100);
draw();