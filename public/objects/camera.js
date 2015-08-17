if(typeof(require) == 'function') var Helpers = require("../../public/helpers.js");
function Camera(x, y, w, h) {
  // the camera represents the player's view
  // which has a position relative to the
  // workspace.
  this.id = Helpers.getNextId();
  this.posx = x || 0;
  this.posy = y || 0;
  this.width = w;
  this.height = h;
  this.setPosition = function(x, y) {
    this.posx = x;
    this.posy = y;
    this.setBoundingBox();
  };
  this.cotr = "Camera";
}

if(typeof module != 'undefined') module.exports = Camera;