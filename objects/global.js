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