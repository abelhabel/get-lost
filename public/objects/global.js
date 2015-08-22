if(!go) var go = {};
go.gridSize = 800;
go.workspace = new Workspace(1e5, 1e5, go.gridSize, go.gridSize),
go.bgScreen = new Screen(window.innerWidth, window.innerHeight, document.getElementById('background'));
go.ui = new UI(),
go.screen = new Screen(window.innerWidth, window.innerHeight, document.getElementById('planets'));
go.uiScreen = new Screen(window.innerWidth, window.innerHeight, document.getElementById('ui'));
go.miniMap = new Screen(375, 375, document.getElementById('minimap'));
go.camera = new Camera(50000, 50000, window.innerWidth, window.innerHeight);
go.playersScreen = new Screen(window.innerWidth, window.innerHeight, document.getElementById('players'));

go.speed = 3;
go.average = 0;
go.lastTime = 0;
go.positionLoopTimer = 0;
go.spritesLoaded = 0;
go.sprites = {
  "Cermonophen": new Sprite('planets/planet5.png'),
  "Koldium": new Sprite('planets/planet11.png'),
  "Magtrium": new Sprite('planets/planet3.png'),
  "Bredide": new Sprite('planets/planet4.png'),
  "Soltriphen": new Sprite('planets/planet13.png'),
  "Oxapetaphen": new Sprite('planets/planet10.png'),
  "Cerdinol": new Sprite('planets/planet16.png'),
  "Palmonophen": new Sprite('planets/planet15.png'),
  "Alpadium": new Sprite('planets/planet12.png'),
  "spikedShip": new Sprite('spikedShip.png')
};

if(typeof module != 'undefined') module.exports = go;