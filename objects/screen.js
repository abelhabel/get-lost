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