if(typeof(require) == 'function') var Helpers = require("../../public/helpers.js");
function Workspace(w, h, gridX, gridY) {
  var ws = this;
  this.id = Helpers.getNextId();
  this.width = w || 100000;
  this.height = h || 100000;
  this.backgroundColor = "#000000";
  this.gridSizeX = gridX;
  this.gridSizeY = gridY;
  this.updateGridSize = function(w, h) {
    this.gridSizeX = w;
    this.gridSizeY = h;
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
    var coordinates = Helpers.getObjectCoordinates(obj);
    var arr = [];
    coordinates.forEach(function(obj) {
      var tile = ws.getGridTile(obj.x, obj.y);
      if(!Helpers.isInArray(arr, tile)){
        arr.push.apply(arr, tile);
      }
    });
    return arr;
  };
  this.getGridTilesOnObjectLoose = function(obj) {
    var coordinates = Helpers.getObjectCoordinates(obj);
    var arr = [];
    coordinates.forEach(function(obj) {
      var tile = ws.getGridTile(obj.x, obj.y);
      arr.push.apply(arr, tile);
    });
    return arr;
  };
  this.addToGrid = function(obj) {
    var tile = this.getGridTile(obj.posx, obj.posy);
    if(!tile) return;
    var match = Helpers.getObjectOnId(tile, obj.id);
    if(match) {
      match.dead = obj.dead;
      if(match.updateSize) match.updateSize(obj.size);
    }else{
     tile.push(obj);
    }
    // if(!obj.dead && !Helpers.isInArray(this.getGridTile(obj.posx, obj.posy), obj))
      
  };
  this.removeFromGrid = function(obj) {
    var tile = this.getGridTile(obj.posx, obj.posy);
    if(!tile) return;
    for(var i = 0; i < tile.length; i += 1) {
      if(tile[i].id == obj.id)
        tile.splice(i, 1);
    }
  };
  this.updateGrid = function(x, y, obj) {
    var tileInitial = this.getGridTile(x, y);
    var tileNew = this.getGridTile(obj.posx, obj.posy);
    if(tileNew && tileInitial && tileInitial !== tileNew) {
      Helpers.removeFromArray(tileInitial, obj);
      tileNew.push(obj);
    }
  };
  this.cotr = "Workspace";
}

if(typeof module != 'undefined') module.exports = Workspace;