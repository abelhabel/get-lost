function BlackHole(x, y, r) {
  this.id = getNextId();
  this.posx = x;
  this.posy = y;
  this.r = r || 25;
  this.size = Math.ceil(Math.random() * 5);
  this.lineThickness = 6;
  this.r = 250;
  this.fillStyle = "#000000";
  this.strokeStyle = "#00AAAA";
  go.workspace.addToGrid(this);
  
}

