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
    clear: '.clear-all',
    negate: '.negate',
    percent: '.percent',
    inputZero: '.zero',
    divide: '.divide',
    multiply: '.multiply',
    substract: '.substract',
    add: '.add',
    equal: '.equal',
    keypad: '.keypad span:not(.clear-all):not(.negate):not(.percent)'
  };

  return {
    updateDisplayLabel: function() {
      
    },

    getDisplayValue: function() {
      return {
        value: document.querySelector(DOMStrings.displayLabel).textContent
      };
    },

    getKeypadValue: function(keypad) {
      return {
        value: keypad.target.innerText
      }
    },

    getDOMstrings: function() {
      return DOMStrings;
    },

    nodeListForEach: function(list, callback) {
      for (var i = 0; i < list.length; i++) {
        callback(list[i], i);
      }
    }
  }

})();

// Global App Controller
var controller = (function(CalcCtrl, UICtrl){

  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings();
    var keypads = document.querySelectorAll(DOM.keypad)
    
    document.querySelector(DOM.clear).addEventListener('click', ctrlClearDisplay);

    UICtrl.nodeListForEach(keypads, function(current) {
      current.addEventListener('click', ctrlUpdateDisplay);
    });

  };

  var ctrlClearDisplay = function() {
    // 1. Get the display current stored value
    input = UICtrl.getDisplayValue();

    console.log(input)
  }

  var ctrlUpdateDisplay = function(event) {

    // 1. Get keypad value
    var value = UICtrl.getKeypadValue(event);
    console.log(value);

    // 2. Calculate new store value


    // 3. Display new displayLabel value
    UICtrl.updateDisplayLabel();

  }

  return {
    init: function() {
      console.log('Application has started.');
      setupEventListeners();
      //CalcCtrl.calculate();
    }
  }
  
})(CalcController, UIController);

controller.init();