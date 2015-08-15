function Camera(x, y, w, h) {
  // the camera represents the player's view
  // which has a position relative to the
  // workspace.
  this.id = getNextId();
  this.posx = x || 0;
  this.posy = y || 0;
  this.width = w;
  this.height = h;
  this.setPosition = function(x, y) {
    this.posx = x;
    this.posy = y;
    this.setBoundingBox();
  };
}
Camera.prototype = new GameObject();