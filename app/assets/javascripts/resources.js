// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

// $( "#dialog" ).dialog({
//   dialogClass: "no-close",
//   buttons: [
//     {
//       text: "OK",
//       click: function() {
//         $( this ).dialog( "close" );
//       }
//     }
//   ]
// });

function prepareCustomFunctions() {

  function createNewPropertyValue(propertyName, propertyClass) {
    var inputProperty = document.createElement("input");
    inputProperty.setAttribute('type', 'text');
    inputProperty.setAttribute('name', propertyClass + '[properties][' + propertyName + ']');
    return inputProperty;
  }
  function createNewLabel(forLabel, content) {
    var label = document.createElement("label");
    label.setAttribute('for', forLabel);
    label.innerHTML = content;
    return label;
  }
  function createNewProperty(propertyName, propertyClass)  {
    var property = document.createElement("div");
    property.setAttribute('class',"field");
    property.appendChild(createNewLabel(propertyClass + '_properties_' + propertyName, propertyName));
    property.appendChild(createNewPropertyValue(propertyName, propertyClass));
    return property;
  }

  var addPropertyButton = document.getElementById("add property btn");
  addPropertyButton.onclick = function () {
    var newPropertyName = document.getElementById("add property field");
    var properties = document.getElementById("form properties");
    properties.appendChild(createNewProperty(newPropertyName.value, "resource"));
  };

}

window.onload = function () {
  prepareCustomFunctions();
}
