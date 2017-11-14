
// Calculator Controller
var CalController = (function(){

  var calculate = function() {

  }

  return {
    calculate: function() {
  
    }
  }

})();

// Global App Controller
var controller = (function(CalCtrl){

  return {
    init: function() {
      console.log('Application has started.');
      CalCtrl.calculate();
    }
  }
  
})(CalController);

controller.init();