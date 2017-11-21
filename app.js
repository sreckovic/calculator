// Calculator Controller
var CalcController = (function(){

  var data = {
    currentValue: '0',
    previousValue: '0',
    currentFunc: ''
  }

  var calculate = function() {

  }

  return {
    store: function(keypadValue) {
      console.log(keypadValue)
      data['previousValue'] = data['currentValue'];

      // Check if currentValue is 0 & keypadValue is dot, we want to type 0.23 for example
      if ( data['currentValue'] === '0' && keypadValue === '.' ) {
        // Assign keypadValue to currentValue
        data['currentValue'] = data['currentValue'] + keypadValue;

        // Check if currentValue is 0, if this is try we want to type a number, we are not starting with dot
      } else if ( data['currentValue'] === '0' ) {
        data['currentValue'] = keypadValue;

      } else {
        // Does previousValue have dot if not
        if ( data['previousValue'].indexOf('.') == -1 ) {
          data['currentValue'] = data['currentValue'] + keypadValue;

          // Does keypadValue have dot?
        } else if ( keypadValue !== '.' ) {
          data['currentValue'] = data['currentValue'] + keypadValue;
        }
      }
    },

    calculate: function() {
      return data['currentValue'];
    },

    test: function() {
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
    updateDisplayLabel: function(val) {
      document.querySelector(DOMStrings.displayLabel).textContent = val;
    },

    clearDisplayLabel: function() {
      document.querySelector(DOMStrings.displayLabel).textContent = '0';
    },

    // Get value of clicked keypad 0 - 9 plus . sign
    getKeypadValue: function(keypadValue) {
      return keypadValue.target.innerText
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
    var DOM, keypads;
    
    DOM = UICtrl.getDOMstrings();
    keypads = document.querySelectorAll(DOM.keypad)
    
    document.querySelector(DOM.clear).addEventListener('click', ctrlClear);

    UICtrl.nodeListForEach(keypads, function(current) {
      current.addEventListener('click', ctrlUpdate);
    });

  };

  var ctrlClear = function() {
    // 1. Clear display
    UICtrl.clearDisplayLabel();
  }

  var ctrlUpdate = function(event) {
    var keypadValue, displayValue;

    // 1. Get keypadValue
    keypadValue = UICtrl.getKeypadValue(event);

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