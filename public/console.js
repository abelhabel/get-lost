function openConsole() {
  console.log('open console');
  if(go.console.style.display == "block") {
    go.console.style.display = "none"
    go.mode = 'explore';
  }else {
    go.console.style.display = "block"
    go.mode = 'adventure';
  }
}

function evaluateConsole(text) {
  
  var inventoryWords = [];
  player.inventory.forEach(function(item) {
    inventoryWords.push(item.name.toLowerCase());
  });
  var words = text.split(' ');
  if(Helpers.findWord(words, 'use')) {
    if(Helpers.findWord(words, 'medallion') && Helpers.findWord(inventoryWords, 'medallion')) {
      player.currentHP += 10;
      player.maxHP += 10;
      go.console.textContent = "" +
      "After some tinkering you found that the Medallion fits " +
      "perfectly inside an impression of a contraption in your " +
      "ship that you had never earlier figured out what use it had." +
      "Your ship gained som extra protection for it.";
    }
  }


  // function()
  // (function(){
  //   eval(text);
  // })();
}