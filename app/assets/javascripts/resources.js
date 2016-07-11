// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

// TODO: Dear God, so many things..  This entire setup should probably be refactored.

function prepareResourceFunctions() {

  // Resource form functions below..
  function deleteProperty(propertyName) {
    var property = document.getElementById("custom property " + propertyName);
    property.innerHTML = '';
  }

  function createNewPropertyValue(propertyName, propertyObject) {
    var inputProperty = document.createElement("input");
    inputProperty.setAttribute('class',"");
    inputProperty.setAttribute('type', 'text');
    inputProperty.setAttribute('name', propertyObject + '[properties][' + propertyName + ']');
    return inputProperty;
  }

  function createNewLabel(forLabel, content) {
    var label = document.createElement("label");
    label.setAttribute('class',"");
    label.setAttribute('for', forLabel);
    label.innerHTML = content;
    return label;
  }

  function createNewPropertyDeleteBtn(propertyName, propertyObject) {
    var deletePropertyBtn = document.createElement("button");
    deletePropertyBtn.innerHTML = 'Delete'
    deletePropertyBtn.setAttribute('class', "delete_button")
    deletePropertyBtn.addEventListener("click", function() {
      deletePropertyBtn.parentNode.innerHTML = '';
    });
    // deletePropertyBtn.onclick = deleteProperty(propertyName);
    return deletePropertyBtn;
  }

  function createNewProperty(propertyName, propertyObject)  {
    var property = document.createElement("div");
    property.setAttribute('class',"field");
    property.setAttribute('id',"custom property " + propertyName);
    property.appendChild(createNewLabel(propertyObject + '_properties_' + propertyName, propertyName));
    property.appendChild(createNewPropertyValue(propertyName, propertyObject));
    property.appendChild(createNewPropertyDeleteBtn(propertyName, propertyObject));
    return property;
  }

  var buttons = document.getElementsByClassName("delete_button");
  for (var i = 0; i < buttons.length; i++) {
    var button = buttons[i];
    button.addEventListener("click", function() {
      this.parentNode.innerHTML = '';
    });
  }

  var addPropertyButton = document.getElementById("add property btn");
  if (addPropertyButton instanceof Object) {
    addPropertyButton.onclick = function () {
      var newPropertyName = document.getElementById("add property field");
      if (newPropertyName.value == "") {
        document.getElementById("error property btn").innerHTML = "Please fill in a name for the property name field."
        return false;
      } else {
        document.getElementById("error property btn").innerHTML = ""
        var properties = document.getElementById("form properties");
        properties.appendChild(createNewProperty(newPropertyName.value, "resource"));
        newPropertyName.value = "";
      }
    };
  }

}
