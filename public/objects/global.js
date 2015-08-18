var go = {
  workspace: new Workspace(1e5, 1e5, 1600, 1600),
  ui: new UI(),
  screen: new Screen(window.innerWidth, window.innerHeight, document.getElementById('background')),
  uiScreen: new Screen(window.innerWidth, window.innerHeight, document.getElementById('ui')),
  camera: new Camera(50000, 50000, window.innerWidth, window.innerHeight),
  renderTile: new Camera(50000, 50000, 1600, 1600)
  
};
go.renderTile.setBoundingBox();
if(typeof module != 'undefined') module.exports = go;