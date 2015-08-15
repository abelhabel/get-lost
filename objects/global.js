var go = {
  workspace: new Workspace(),
  ui: new UI(),
  screen: new Screen(window.innerWidth, window.innerHeight, document.getElementById('background')),
  uiScreen: new Screen(window.innerWidth, window.innerHeight, document.getElementById('ui')),
  camera: new Camera(50000, 50000, window.innerWidth, window.innerHeight),
  shapes: [],
  translateXY: function(x, y) {
    return {
      x: this.camera.xmin + x,
      y: this.camera.ymin + y
    }
  }
};