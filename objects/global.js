var go = {
  workspace: new Workspace(),
  ui: new UI(),
  screen: new Screen(window.innerWidth, window.innerHeight, document.getElementById('background')),
  uiScreen: new Screen(window.innerWidth, window.innerHeight, document.getElementById('ui')),
  camera: new Camera(50000, 50000, window.innerWidth, window.innerHeight),
  idCount: 0,
  getNextId: function(){return this.idCount += 1}
};