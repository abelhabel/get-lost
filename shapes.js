function Square(x, y, w, h) {
  this.posx = x;
  this.posy = y;
  this.width = w;
  this.height = h;
  this.setBoundingBox = function() {
    this.xmin = this.posx - this.width/2;
    this.xmax = this.posx + this.width/2;
    this.ymin = this.posy - this.height/2;
    this.ymax = this.posy + this.height/2;
  };
  this.setBoundingBox();
  this.fill = true;
  this.stroke = true;
  this.fillStyle = "#FFFFFF";
  this.strokeStyle = "#000000";
  go.shapes.push(this);
}

function Planet(x, y, r) {
  this.posx = x;
  this.posy = y;
  this.r = r;
  this.randomSize = function() {
    this.size = Math.ceil(Math.random() * 10);
    this.lineThickness = 0.5 * this.size;
    this.r = 25 * this.size;
    this.fillStyle = getRGB();
    this.strokeStyle = getRGB();
  };
  this.randomSize();
  this.setBoundingBox = function() {
    this.xmin = this.posx - this.r;
    this.xmax = this.posx + this.r;
    this.ymin = this.posy - this.r;
    this.ymax = this.posy + this.r;
  };

  go.shapes.push(this);
  go.workspace.addToGrid(this);
}

// new Planet(5000, 5000, 400);
function populateWorld() {
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








