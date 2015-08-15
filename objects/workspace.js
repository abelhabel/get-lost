function Workspace(w, h) {
  var ws = this;
  this.id = getNextId();
  this.width = w || 100000;
  this.height = h || 100000;
  this.backgroundColor = "#000000";
  this.gridSizeX = window.innerWidth;
  this.gridSizeY = window.innerHeight;
  this.updateGridSize = function() {
    this.gridSizeX = window.innerWidth;
    this.gridSizeY = window.innerHeight;
  };
  this.gridify = function() {
    var grid = {};
    for(var i = 0; i < this.width; i += this.gridSizeX) {
      for(var j = 0; j < this.height; j += this.gridSizeY) {
        grid[i + ":" + j] = [];
      }
    }
    this.grid = grid;
  };
  this.gridify();
  this.getGridTile = function(x, y) {
    var gridX = x - (x % this.gridSizeX);
    var gridY = y - (y % this.gridSizeY);
    return this.grid[gridX + ":" + gridY];
  };
  this.getGridTilesOnObject = function(obj) {
    var coordinates = getObjectCoordinates(obj);
    var arr = [];
    coordinates.forEach(function(obj) {
      var tile = ws.getGridTile(obj.x, obj.y);
      if(!isInArray(arr, tile))
        arr = arr.concat(tile);
    });
    return arr;
  };
  this.addToGrid = function(obj) {
    this.getGridTile(obj.posx, obj.posy).push(obj);
  };
  this.updateGrid = function(x, y, obj) {
    var tileInitial = this.getGridTile(x, y);
    var tileNew = this.getGridTile(obj.posx, obj.posy);
    if(tileInitial !== tileNew) {
      removeFromArray(tileInitial, obj);
      tileNew.push(obj);
    }
  };
}