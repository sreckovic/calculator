// Calculator Controller
var CalcController = (function(){

  var data = {
    currentValue: '0',
    previousValue: '0'
  }

  var calculate = function() {

  }

  return {
    store: function(keypadValue) {
      data['previousValue'] = data['currentValue'];

      // Check if my current state is starting 0
      if ( data['currentValue'] === '0' ) {
        // Just assign keypadValue as current value
        data['currentValue'] = keypadValue;
      } else {

        // Check if we already used .
        if ( data['previousValue'].indexOf('.') == -1 ) {
          data['currentValue'] = data['currentValue'] + keypadValue;

          // Check if we use . again
        } else if ( keypadValue !== '.' ) {
          data['currentValue'] = data['currentValue'] + keypadValue;
        }

      }
    },

    calculate: function() {
      return data['currentValue'];
    },

    testing: function() {
      console.log(data);
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
    updateDisplayLabel: function(value) {
      document.querySelector(DOMStrings.displayLabel).textContent = value;
    },

    // Get value of clicked keypad 0 - 9 plus . sign
    getKeypadValue: function(keypad) {
      return keypad.target.innerText
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
    // 1.
  }

  var ctrlUpdateDisplay = function(event) {
    var keypadValue, displayValue;

    // 1. Get keypad value
    keypadValue = UICtrl.getKeypadValue(event);
    //console.log(keypadValue);

    // 2. Store previous value
    CalcCtrl.store(keypadValue);

    // 2. Calculate new value
    displayValue = CalcCtrl.calculate();

    // 3. Display new displayLabel value
    UICtrl.updateDisplayLabel(displayValue);

  }

  return {
    init: function() {
      console.log('Application has started.');
      setupEventListeners();
    }
  }
  
})(CalcController, UIController);

controller.init();