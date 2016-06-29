// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

function prepareCustomFunctions() {

  function eleMouseDown () {
    stateMouseDown = true;
    document.addEventListener ("mousemove" , eleMouseMove , false);
  }

  function eleMouseMove (ev) {
    var pX = ev.pageX;
    var pY = ev.pageY;
    ele.style.left = pX + "px";
    ele.style.top = pY + "px";
    document.addEventListener ("mouseup" , eleMouseUp , false);
  }

  function eleMouseUp () {
    document.removeEventListener ("mousemove" , eleMouseMove , false);
    document.removeEventListener ("mouseup" , eleMouseUp , false);
  }

  // var resources = document.getElementsByClassName ("resource");
  // //ele.onmousedown = eleMouseDown;
  // for (var i = 0; i < resources.length; i++) {
  //   resource = resources[i];
  //   resource.addEventListener ("mousedown" , eleMouseDown , false);
  // }

}

window.onload = function () {
  prepareCustomFunctions();
}
