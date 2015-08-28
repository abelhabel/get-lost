if(!go) var go = {};
go.playerDiv = document.getElementById('player');
go.mode = 'menu';
go.gridSize = 2000;
go.workspace = new Workspace(1e5, 1e5, go.gridSize, go.gridSize),
go.bgScreen = new Screen(window.innerWidth, window.innerHeight, document.getElementById('background'));
go.ui = new UI(),
go.screen = new Screen(window.innerWidth, window.innerHeight, document.getElementById('planets'));
go.uiScreen = new Screen(window.innerWidth, window.innerHeight, document.getElementById('ui'));
go.miniMap = new Screen(375, 375, document.getElementById('minimap'));
go.minimapFrame = document.getElementById('minimapFrame');
go.camera = new Camera(50000, 50000, window.innerWidth, window.innerHeight);
go.playersScreen = new Screen(window.innerWidth, window.innerHeight, document.getElementById('players'));
go.hud = new Screen(window.innerWidth, window.innerHeight, document.getElementById('hud'));
go.hudHTML = document.getElementById('uiFrame');
go.mainMenu = document.getElementById('mainMenu');
go.instructionsMenu = document.getElementById('instructionsMenu');
go.nowPlaying = document.getElementById('nowPlaying');
go.toolTip = document.getElementById('toolTip');
go.muteSound = document.getElementById('muteSound');
go.an = document.getElementById('adventureNotification');
go.adventureFrame = document.getElementById('adventureFrame');
go.adventureScene = document.getElementById('sceneDescription');
go.adventureFeedback = document.getElementById('feedback');
go.adventureInput = document.getElementById('input');

go.body = document.getElementsByTagName('body')[0];
go.console = document.getElementById('console');
go.console.addEventListener('keyup', function(e){
  if(e.keyCode == 13 && !e.shiftKey) {
    evaluateConsole(this.textContent.trim());
    // this.innerHTML = "";
  }
})
go.renderPosX = 0;
go.renderPosY = 0;
go.stats = {
  maxSpeed: document.getElementById('maxSpeed'),
  acceleration: document.getElementById('acceleration'),
  engineEfficiency: document.getElementById('fuelEfficiency'),
  projectileSpeed: document.getElementById('projectileSpeed'),
  reloadSpeed: document.getElementById('reloadTime'),
  projectileDamage: document.getElementById('projectileDamage'),
  xp: document.getElementById('xp'),
  currentHP: document.getElementById('hp'),
  Cermonophen: document.getElementById('Cermonophen'),
  Koldium: document.getElementById('Koldium'),
  Magtrium: document.getElementById('Magtrium'),
  Bredide: document.getElementById('Bredide'),
  Soltriphen: document.getElementById('Soltriphen'),
  Oxapetaphen: document.getElementById('Oxapetaphen'),
  Cerdinol: document.getElementById('Cerdinol'),
  Palmonophen: document.getElementById('Palmonophen'),
  Alpadium: document.getElementById('Alpadium')
}

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
  "spikedShip": new Sprite('spikedship.png'),
  "purpleSpace": new Sprite('stars-background-purple-repeat.png')
};

go.muteSound.addEventListener('mousedown', function(){
  if(go.soundVolumes.music == 0) 
  {
    go.soundVolumes.music = 0.4;
    go.soundVolumes.effect = 0.2;
    go.radio.tracks[go.radio.currentTrack].unpause();
    this.textContent = "Mute sound";
  }else {
    go.soundVolumes.music = 0;
    go.soundVolumes.effect = 0;
    go.radio.tracks[go.radio.currentTrack].pause();
    this.textContent = "Unmute sound";
  }
});
go.soundVolumes = {
  music: 0.4,
  effect: 0.2
};
go.soundsLoaded = 0;
go.sounds = {
  menuHover: new Sound('ui/menu-hover.mp3'),
  guardianShoot: new Sound('shoot/guardian.mp3'),
  guardianHit: new Sound('hit/guardian.mp3'),
  boss1: new Sound('atmosphere/boss1.mp3'),
  symbal: new Sound('atmosphere/symbal.mp3'),
  noise: new Sound('atmosphere/noise.mp3'),
  scan: new Sound('atmosphere/scan.mp3'),
  warp: new Sound('atmosphere/warp.mp3'),
  playerShoot: new Sound('shoot/player.mp3'),
  intro: new Sound('intro.mp3', true, 'music', "When lost stars are found"),
  bricked: new Sound('bricked-expectations.mp3', false, 'music', 'Bricked Expectations'),
  distressCall: new Sound('distress-call.mp3', false, 'music', 'Distress Call'),
  fiveFour: new Sound('five-four.mp3', false, 'music', 'Five Four'),
  howCould: new Sound('how-could-this-happen-to-me.mp3', false, 'music', 'How Could This Happen To Me'),
  invasionLeague: new Sound('invasion-league.mp3', false, 'music', 'Invasion League'),
  siren: new Sound('siren-and-echo.mp3', false, 'music', 'Siren and Echo'),
  soMuch: new Sound('so-much.mp3', false, 'music', 'So Much'),
  somethings: new Sound('somethings-right.mp3', false, 'music', "Something's Right")
};
go.radio = {
  tracks: [go.sounds.intro, go.sounds.bricked, go.sounds.distressCall,
            go.sounds.fiveFour, go.sounds.howCould, go.sounds.invasionLeague,
            go.sounds.siren, go.sounds.soMuch, go.sounds.somethings],
  currentTrack: 0
};
if(typeof module != 'undefined') module.exports = go;