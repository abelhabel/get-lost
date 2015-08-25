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
  (function(){
    eval(text);
  })();
}