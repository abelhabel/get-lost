function Lightbox(src, w, h)
{
  var outer = document.createElement('div');
  outer.className = "outer";
  document.getElementsByTagName('body')[0].appendChild(outer);
  
  var frame = document.createElement('iframe');
  frame.className = "lbFrame";
  frame.src = src;
  frame.style.width = w + "px";
  frame.style.height = h + "px";
  frame.scrolling = "no";
  outer.appendChild(frame);
  
  var footer = document.createElement('a');
  footer.className = "lbFooter";
  outer.appendChild(footer);
  footer.textContent = src;
  footer.href = src;
  footer.target = "_blank";
  
  outer.addEventListener('click', function(e) {
    if(e.target !== frame) {
      outer.parentNode.removeChild(outer);
      player.inAdventure = false;
    }
  }, false);
}