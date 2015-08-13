function Workspace(w, h) {
  var ws = this;
  this.width = w || 100000;
  this.height = h || 100000;
  this.backgroundColor = "#000000";
  this.gridSize = 1600;
  this.gridify = function() {
    var grid = {};
    for(var i = 0; i < this.width; i += this.gridSize) {
      for(var j = 0; j < this.height; j += this.gridSize) {
        grid[i + ":" + j] = [];
      }
    }
    this.grid = grid;
  };
  this.gridify();
  this.getGridTile = function(x, y) {
    var gridX = x - (x % this.gridSize);
    var gridY = y - (y % this.gridSize);
    return this.grid[gridX + ":" + gridY];
  };
  this.getGridTilesOnObject = function(obj) {
    var coordinates = getObjectCoordinates(obj);
    var arr = [];
    coordinates.forEach(function(obj) {
      arr = arr.concat(ws.getGridTile(obj.x, obj.y));
    });
    return arr;
  };
  this.addToGrid = function(obj) {
    this.getGridTile(obj.posx, obj.posy).push(obj);
  };
}