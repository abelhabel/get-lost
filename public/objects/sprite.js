function Sprite(src) {
  this.image = new Image();
  this.image.src = "public/img/" + src;
  this.image.onload = function() {
    checkSprites();
  };
  go.totalSprites += 1;
}

function checkSprites() {
  go.spritesLoaded += 1;
  if(go.spritesLoaded == go.totalSprites) {
    // startGame();
  }
}