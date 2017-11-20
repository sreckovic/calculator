
// Calculator Controller
var CalcController = (function(){

  var calculate = function() {

  }

  return {
    calculate: function() {
  
    }
  }

})();

var UIController = (function(){

  var DOMStrings = {
    displayLabel: '.display',
  };

})();

// Global App Controller
var controller = (function(CalcCtrl, UICtrl){

  return {
    init: function() {
      console.log('Application has started.');
      CalcCtrl.calculate();
    }
  }
  
})(CalcController, UIController);

controller.init();