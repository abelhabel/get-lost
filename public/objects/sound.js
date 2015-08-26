function Sound(src, loop, type, name) {
  this.name = name;
  this.audio = new Audio();
  this.audio.preload = "none";
  this.audio.src = window.location.protocol +"//www.prepressed.se/music/" + src;
  this.audio.autoPlay = false;
  this.audio.loop = loop || false;
  this.type = type || 'effect';
  
  this.play = function() {
    this.audio.volume = go.soundVolumes[this.type];
    if(!this.audio.paused) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio.play();
    }else
    {
      this.audio.play();
    }
    if(this.type == 'music') {
      go.nowPlaying.textContent = this.name;
    }
  };

  this.setVolume = function(volume) {
    if(!this.audio.paused) {
      this.audio.pause();
      this.audio.volume = volume;
      this.audio.play();
    }
    
  };

  this.pause = function() {
    this.audio.pause();
    this.audio.volume = 0;
  };

  this.stop = function() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.volume = 0;
  }
  go.totalSounds += 1;
}