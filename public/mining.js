function miningLoop() {
  var arr = go.workspace.getGridTilesOnObject(go.camera);

  arr.forEach(function(obj) {
    if(obj instanceof Planet) {
      obj.isMined = false;
      if(intersectCircle(player, obj)) {
        socket.emit('mining', obj);
        player.startMining(obj);
      }else
      {
        obj.isMined = false;
        player.currentlyMining = false;
      }
      
    }
  })
}