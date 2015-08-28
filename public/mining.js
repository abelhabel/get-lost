function miningLoop() {
  var arr = go.workspace.getGridTilesOnObject(player);
  if(player.currentlyMining && !intersectCircle(player, player.currentlyMining)) {
    player.currentlyMining = null;
  }
  arr.forEach(function(obj) {
    if(obj instanceof Planet) {
      obj.isMined = false;
      if(intersectCircle(player, obj)) {
        socket.emit('mining', obj);
        obj.isMined = true;
        player.currentlyMining = obj;
      }else
      {
        obj.isMined = false;
      }
      
    }
  })
}