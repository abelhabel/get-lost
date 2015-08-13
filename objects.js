var go = {
  workspace: new Workspace(),
  screen: new Screen(window.innerWidth, window.innerHeight),
  camera: new Camera(5000, 5000, window.innerWidth, window.innerHeight),
  shapes: [],
  translateXY: function(x, y) {
    return {
      x: this.camera.xmin + x,
      y: this.camera.ymin + y
    }
  }
};

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
    // var gridX = obj.posx - (obj.posx % this.gridSize);
    // var gridY = obj.posy - (obj.posy % this.gridSize);
    // this.grid[gridX + ":" + gridY].push(obj);
    this.getGridTile(obj.posx, obj.posy).push(obj);
  };
}

function Screen(w, h) {
  // the screen object represents the physical screen,
  // or rather the view port in the browser and so,
  // its width and height should only change when
  // the view port changes
  this.canvas = document.getElementById('canvas');
  this.width = this.canvas.width = w;
  this.height = this.canvas.height = h;
  this.context = this.canvas.getContext('2d');
}

function Camera(x, y, w, h) {
  // the camera represents the player's view
  // which has a position relative to the
  // workspace.
  this.posx = x || 0;
  this.posy = y || 0;
  this.width = w;
  this.height = h;
  this.vx = this.vy = 2;
  this.vxr = this.vxl = this.vyd = this.vyu = 0;
  this.setBoundingBox = function() {
    this.xmin = this.posx - this.width/2;
    this.xmax = this.posx + this.width/2;
    this.ymin = this.posy - this.height/2;
    this.ymax = this.posy + this.height/2;
  };
  this.setBoundingBox();
  this.setPosition = function(x, y) {
    this.posx = x;
    this.posy = y;
    this.setBoundingBox();
  };
  this.isInView = function(screen, shape) {
    var width = screen.width;
    var height = screen.height;
    return intersectRect({
      xmin: this.posx - width/2,
      xmax: this.posx + width/2,
      ymin: this.posy - height/2,
      ymax: this.posy + height/2
    }, shape);
  };
  this.move = function() {
    this.posx += this.vx * (this.vxl + this.vxr);
    this.posy += this.vy * (this.vyu + this.vyd);
    this.setBoundingBox();
  }
}

