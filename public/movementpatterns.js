function bezierPattern(pos) {
  if(this instanceof Object && pos instanceof Array) {
    this.t += this.speed / 500;
    var i = 0;
    var a = (1 - this.t);
    var b = this.t;
    var finalX = Math.round(pos[0][0] * (a * a) + pos[1][0] * (2 * a * b) + pos[2][0] * (b * b));
    var finalY = Math.round(pos[0][1] * (a * a) + pos[1][1] * (2 * a * b) + pos[2][1] * (b * b));
    this.posx = this.ox + finalX;
    this.posy = this.oy + finalY;
    if(this.t > 0.99) {
      this.movementStage += 1;
      this.t = 0;
      if(this.movementStage == this.movementPattern.length) {
        //  removeFromArray(this, go.ships);
        // this.destroySelf();
        go.workspace.removeFromGrid(this);
      }
    }
  }
}
var MovementPatterns = {
    left: [[[15,494],[310,128],[632,427]], [[632,427],[949,150],[1200,509]]],
    right: [[[1148,490],[922,139],[641,511]], [[641,511],[336,135],[-50,474]]],
    leftBack: [[[59,735],[531,644],[576,376]], [[576,376],[816,680],[1196,725]]],
    rightBackBack: [[[1129,726],[967,387],[617,351]], [[617,351],[172,263],[-50,27]]],
    rightUpLeftDown: [[[1138,51],[293,133],[18,788]]],
    leftUpRightDown: [[[13,21],[856,112],[1196,780]]],
    leftDownRightUpDown: [[[35,26],[75,555],[95,754]], [[95,754],[159,582],[332,511]], [[332,511],[308,747],[308,800]]],
    middleRightForward: [[[566,63],[587,667],[589,380]], [[589,380],[899,415],[929,800]]],
    leftSideBackForward: [[[1096,60],[200,364],[1106,724]], [[1106,724],[881,236],[548,149]], [[548,149],[595,514],[90,800]]]
};


if(typeof module != 'undefined') module.exports = MovementPatterns;