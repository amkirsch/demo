// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

function prepareDesignerFunctions() {

  function handleDragStart(e) {
    this.style.opacity = '0.4';  //this / e.target is the source node.
  }

  function handleDragLeave(e) {
    this.style.opacity = '1.0';  //this / e.target is the source node.
  }

  // var resources = document.querySelectorAll('#resources .resource');
  var resources = document.getElementsByClassName('resource');
  [].forEach.call(resources, function(resource) {
    resource.addEventListener('dragstart', handleDragStart, false);
    resource.addEventListener('dragleave', handleDragLeave, false); 
  });

}


  // var resources = document.getElementsByClassName ("resource");
  // //ele.onmousedown = eleMouseDown;
  // for (var i = 0; i < resources.length; i++) {
  //   resource = resources[i];
  //   resource.addEventListener ("mousedown" , eleMouseDown , false);
  // }
  // function eleMouseDown () {
  //   stateMouseDown = true;
  //   document.addEventListener ("mousemove" , eleMouseMove , false);
  // }
  //
  // function eleMouseMove (ev) {
  //   var pX = ev.pageX;
  //   var pY = ev.pageY;
  //   ele.style.left = pX + "px";
  //   ele.style.top = pY + "px";
  //   document.addEventListener ("mouseup" , eleMouseUp , false);
  // }
  //
  // function eleMouseUp () {
  //   document.removeEventListener ("mousemove" , eleMouseMove , false);
  //   document.removeEventListener ("mouseup" , eleMouseUp , false);
  // }
