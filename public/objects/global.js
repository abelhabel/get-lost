if(!go) var go = {};
go.workspace = new Workspace(1e5, 1e5, 1600, 1600),
go.ui = new UI(),
go.screen = new Screen(window.innerWidth, window.innerHeight, document.getElementById('background'));
go.uiScreen = new Screen(window.innerWidth, window.innerHeight, document.getElementById('ui'));
go.miniMap = new Screen(375, 375, document.getElementById('minimap'));

go.camera = new Camera(50000, 50000, window.innerWidth, window.innerHeight);
go.renderTile = new Camera(50000, 50000, 1600, 1600),

go.playersScreen = new Screen(window.innerWidth, window.innerHeight, document.getElementById('players'));
go.renderTile.setBoundingBox();
if(typeof module != 'undefined') module.exports = go;