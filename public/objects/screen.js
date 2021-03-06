if(typeof(require) == 'function') var Helpers = require("../../public/helpers.js");
function Screen(w, h, canvas) {
  // the screen object represents the physical screen,
  // or rather the view port in the browser and so,
  // its width and height should only change when
  // the view port changes
  this.id = Helpers.getNextId();
  this.canvas = canvas;
  this.width = this.canvas.width = w;
  this.height = this.canvas.height = h;
  this.context = this.canvas.getContext('2d');
  this.cotr = "Screen";
}

if(typeof module != 'undefined') module.exports = Screen;