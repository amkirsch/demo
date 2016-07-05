// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

// NOTE: Reference: http://www.html5rocks.com/en/tutorials/dnd/basics/

function prepareDesignerFunctions() {

  var dragSrcEl = null;
  function handleDragStart(e) {
    this.style.opacity = '0.4';  //this / e.target is the source node.

    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }


  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault(); // Needed, allows to drop
    }

    e.dataTransfer.dropEffect = 'move'; // see the section on the DataTransfer object.

    return false;
  }

  function handleDragEnter(e) {
    this.classList.add('over');
  }

  function handleDragLeave(e) {
    this.classList.remove('over');
  }

  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }
    // Don't do anything if dropping the same resource we're dragging.

    var recipes = document.getElementsByClassName('recipe-li');
    [].forEach.call(recipes, function(recipe) {
      if (e.currentTarget === recipe) {
        console.log('found recipe: ' + recipe.parentNode.getAttribute('recipe-id'));
        console.log(dragSrcEl);
        recipe.parentNode.appendChild(dragSrcEl)
        return false
      }
    });
    // var resources = document.querySelectorAll('.resource');
    // [].forEach.call(resources, function(resource, i) {
    //   console.log('comparing resource: ' + resource + ' to ' + e.currentTarget);
    //   if (e.currentTarget === resource && dragSrcEl != e.currentTarget) {
    //     // Set the source resource's HTML to the HTML of the resource we dropped on.
    //     srcId = dragSrcEl.getAttribute('resource-id');
    //     dragSrcEl.setAttribute('resource-id', this.getAttribute('resource-id'));
    //     this.setAttribute('resource-id', srcId);
    //
    //     dragSrcEl.innerHTML = this.innerHTML;
    //     this.innerHTML = e.dataTransfer.getData('text/html');
    //   }
    // });

    if (dragSrcEl != e.currentTarget && e.currentTarget.hasAttribute('resource-id')) {
      // Set the source resource's HTML to the HTML of the resource we dropped on.
      srcId = dragSrcEl.getAttribute('resource-id');
      dragSrcEl.setAttribute('resource-id', this.getAttribute('resource-id'));
      this.setAttribute('resource-id', srcId);

      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
    }
    return false;
  }

function saveItem(item) {
  var request = new XMLHttpRequest();
  var token = document.querySelector('meta[name="csrf-token"]').content;
  request.open('PUT', encodeURI('designer/sort?' + item));
  request.setRequestHeader('X-CSRF-Token', token);
  request.send();
}
function updatePositions() {
  var recipes = document.querySelectorAll('.recipes div');
  [].forEach.call(recipes, function(recipe) {
    var resources = recipe.querySelectorAll('.resource');
    [].forEach.call(resources, function(resource, i) {
      var position = i + 1;
      var item = 'sort[recipe_id]=' + recipe.getAttribute('recipe-id') + '&sort[resource_id]=' + resource.getAttribute('resource-id') + '&sort[resource_position]=' + position;
      saveItem(item);
    });
  });
}

  function handleDragEnd(e) {
    [].forEach.call(resources, function(resource) {
      resource.classList.remove('over');
      resource.style.opacity = '1.0';  //this / e.target is the source node.
    });
    updatePositions();
    dragSrcEl = null;
  }

  // var resources = document.querySelectorAll('#resources .resource');
  var resources = document.getElementsByClassName('resource');
  [].forEach.call(resources, function(resource) {
    resource.addEventListener('dragstart', handleDragStart, false);
    resource.addEventListener('dragenter', handleDragEnter, false);
    resource.addEventListener('dragover', handleDragOver, false);
    resource.addEventListener('dragleave', handleDragLeave, false);
    resource.addEventListener('drop', handleDrop, false);
    resource.addEventListener('dragend', handleDragEnd, false);
  });

  var recipes = document.getElementsByClassName('recipe');
  [].forEach.call(recipes, function(recipe) {
    recipe.parentNode.addEventListener('drop', handleDrop, false);
    recipe.parentNode.addEventListener('dragover', handleDragOver, false);
    recipe.parentNode.addEventListener('dragleave', handleDragLeave, false);
    recipe.parentNode.addEventListener('dragend', handleDragEnd, false);
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
