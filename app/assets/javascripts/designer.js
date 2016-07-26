// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

// NOTE: Reference: http://www.html5rocks.com/en/tutorials/dnd/basics/

// Global so events can be attached
var myModal;

function prepareResourceButtons() {

  myModal = new Modal({content: "<div id='modal-content'></div>", maxWidth: 600});
  var resourceEditButtons = document.querySelectorAll('.edit-btn');
  var editButton;
  for (var i = 0; i < resourceEditButtons.length; i++) {
    editButton = resourceEditButtons[i];
    editButton.addEventListener('click', function(evt) {
      myModal.open();
    });
  }

  var resourceCreateButtons = document.querySelectorAll('.create-btn');
  var createButton;
  for (var i = 0; i < resourceCreateButtons.length; i++) {
    createButton = resourceCreateButtons[i];
    createButton.addEventListener('click', function(evt) {
      myModal.open();
    });
  }
}

function prepareDesignerFunctions() {

  /* Toggle between adding and removing the "active" and "show" classes when the user clicks on one of the "Section" buttons. The "active" class is used to add a background color to the current button when its belonging panel is open. The "show" class is used to open the specific accordion panel */
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function(){
      var icon = $(this).children('i:first');
      icon.toggleClass('fa-caret-right fa-caret-down');
      this.classList.toggle("active");
      this.nextElementSibling.nextElementSibling.classList.toggle("show");
    }
  }

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

    var recipes = document.getElementsByClassName('recipe');
    [].forEach.call(recipes, function(recipe) {
      if (e.currentTarget === recipe) {
        recipe.parentNode.appendChild(dragSrcEl)
        return false
      }
    });
    if (dragSrcEl != e.currentTarget && e.currentTarget.hasAttribute('resource-id')) {
      // Set the source resource's HTML to the HTML of the resource we dropped on.
      srcId = dragSrcEl.getAttribute('resource-id');
      dragSrcEl.setAttribute('resource-id', this.getAttribute('resource-id'));
      this.setAttribute('resource-id', srcId);

      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');

      // ensure our click events are reset post DnD
      dragSrcEl.querySelector('.edit-btn').addEventListener('click', function(evt) {
        myModal.open();
      });
      this.querySelector('.edit-btn').addEventListener('click', function(evt) {
        myModal.open();
      });
    }
    return false;
  }

  function handleDragEnd(e) {
    [].forEach.call(resources, function(resource) {
      resource.classList.remove('over');
      resource.style.opacity = '1.0';  //this / e.target is the source node.
    });
    dragSrcEl = null;
    updatePositions();
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

function ajax(url, data, x) {
  try {
    x = new(this.XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
    x.open(data ? 'POST' : 'GET', url, 1);
    x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    var token = document.querySelector('meta[name="csrf-token"]').content;
    x.setRequestHeader('X-CSRF-Token', token);

    // NOTE: Not sure if this will be needed or not
    // x.onreadystatechange = function () {
    //   x.readyState > 3 && callback && callback(x.responseText, x);
    // };
    x.send(data)
  } catch (e) {
    window.console && console.log(e);
  }
};

function updatePositions() {
  var recipes = document.querySelectorAll('[recipe-id]');
  [].forEach.call(recipes, function(recipe) {
    var resources = recipe.querySelectorAll('.resource');
    [].forEach.call(resources, function(resource, i) {
      var position = i + 1;
      var item = 'sort[recipe_id]=' + recipe.getAttribute('recipe-id') + '&sort[resource_id]=' + resource.getAttribute('resource-id') + '&sort[resource_position]=' + position;
      saveItem(item);
    });
  });

  function saveItem(item) {
    ajax('designer/sort?', item)
  }

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
