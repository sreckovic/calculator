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
      //console.log(keypadValue)

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

    clear: function() {
      data['previousValue'] = data['currentValue'];
      data['currentValue'] = '0';
    },

    calculate: function(operation) {
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
    keypad: '.keypad span:not(.clear-all):not(.negate):not(.percent)',
    sidebar: '.sidebar span'
  };

  return {
    updateDisplayLabel: function(val) {
      document.querySelector(DOMStrings.displayLabel).textContent = val;
    },

    updateClearAllLabel: function() {
      document.querySelector(DOMStrings.clear).textContent = 'C';
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
    var DOM, keypads, sidebar;
    
    DOM = UICtrl.getDOMstrings();
    keypads = document.querySelectorAll(DOM.keypad);
    sidebar = document.querySelectorAll(DOM.sidebar);
    
    document.querySelector(DOM.clear).addEventListener('click', ctrlClear);

    //document.querySelector(DOM.add).addEventListener('click', ctrlOperation);

    // Add Event Listener to all keypadas 0 - 9 and dot
    UICtrl.nodeListForEach(keypads, function(current) {
      current.addEventListener('click', ctrlUpdate);
    });

    // Add Event Listener to all operations in sidebar
    UICtrl.nodeListForEach(sidebar, function(current) {
      current.addEventListener('click', ctrlOperation);
    });

    

  };

  var ctrlClear = function() {
    // 1. Save current state
    CalcCtrl.clear();

    // 2. Clear display
    UICtrl.clearDisplayLabel();
  }

  var ctrlUpdate = function(event) {
    var keypadValue, displayValue;

    // 1. Get keypadValue
    keypadValue = UICtrl.getKeypadValue(event);

    // 2. Update clear label from AC to C
    UICtrl.updateClearAllLabel();

    // 3. Store previous value
    CalcCtrl.store(keypadValue);

    // 4. Calculate new value
    displayValue = CalcCtrl.calculate();

    // 5. Display new displayLabel value
    UICtrl.updateDisplayLabel(displayValue);

  }

  var ctrlOperation = function(event) {
    console.log('Operation: ' + event.target.className);
  }

  return {
    init: function() {
      console.log('Application has started.');
      setupEventListeners();
    }
  }
  
})(CalcController, UIController);

controller.init();