function populateWorld(workspace) {
  var keys = Object.keys(workspace.grid);
  var key, planet, guardian;
  var rangeX = workspace.gridSizeX;
  var rangeY = workspace.gridSizeY;
  for(var i = 0; i < keys.length; i += 1 ) {
    key = keys[i];
    var xy = key.split(':');
    var baseX = parseInt(xy[0]);
    var baseY = parseInt(xy[1])
    var x = baseX + parseInt(Math.random() * rangeX);
    var y = baseY + parseInt(Math.random() * rangeY);

    if(i % 2 == 0) {
      planet = new Planet(x, y);
      guardian = new Guardian(x, y, planet);
      go.workspace.addToGrid(planet);
      go.workspace.addToGrid(guardian);
      // go.workspace.addToGrid(new Star(x, y));
    }else{
      planet = new Planet(x, y);
      planet.adventure = "http://www.prepressed.se/Games/adventure";
      workspace.addToGrid(planet);
      // go.workspace.addToGrid(new Star(x, y, Math.round(Math.random() * 100)));
    } 
  }
}