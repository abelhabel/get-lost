// NOTES
// arr = arr.concat(tile); vs arr.push.apply(arr, tile); : 1.86 vs 1.38
// last max test without movement: 400 galaxies, 1000 players (2.5 players per galaxy)
// chrome crash while generating more than 400 galaxies at once. it
// does not even get to the simulation of updating galaxies, ie 'objectsSync'
// 400 galaxies with 20 players in each galaxy take 1.2 Gb of RAM in Chrome
// 40 players in each galaxy is about the same.
// I can go to 450 galaxies but soon after that chrome starts to crash

var goTesting = {
  galaxies: [],
  players: [],
  camera: new Camera(50000,50000, 1600, 1600)
};

function testGalaxyLoad(galaxyCount, playerCount, delay) {

  var galaxies = [];
  var players = [];
  var workspace, player;
  var workspaceWidth = 1e5;
  var workspaceHeight = 1e5;
  var gridX = 1600;
  var gridY = 1600;
  for(var i = 0; i < galaxyCount; i += 1) {
    (function(i) {
      setTimeout(function() {
        workspace = new Workspace(workspaceWidth, workspaceHeight, gridX, gridY);
        workspace.players = [];
        populateWorld(workspace);
        for(var j = 0; j < playerCount; j += 1) {
          player = new Player(50000, 50000, 50);
          // console.log(j % galaxies.length);
          workspace.players.push(player);
        }
        goTesting.galaxies.push(workspace);
        console.log(goTesting.galaxies.length);
      }, delay * i);
      
    })(i);
    
  }
  // goTesting.galaxies = galaxies;
  // goTesting.players = players;
}

function objectsSync(duration) {
  //duration is in seconds
  
  (function() {
    
    var serverInterval = 16;
    var count = 0;
    goTesting.timer = setInterval(function() {
      count += 1;
      for(var i = 0, l = goTesting.galaxies.length; i < l; i += 1) {
        var galaxy = goTesting.galaxies[i];

        goTesting.camera.vx = goTesting.camera.vy = Math.random() * 4;
        goTesting.camera.move(galaxy);

        goTesting.galaxies[i].players.forEach(function(player) {
          galaxy.getGridTilesOnObject(goTesting.camera);
        });        

        if(duration * 1000 < serverInterval * count) {
          console.log('running');
          count = 0;
        }
      }
    }, serverInterval);

  })();
}