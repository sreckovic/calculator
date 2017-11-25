// Calculator Controller
var CalcController = (function(){

  var data = {
    currentValue: '0',
    previousValue: '0',
    currentFunc: ''
  };

  var calculate = function() {

  };

  return {
    storeKeypadValue: function(keypadValue) {

      data.previousValue = data.currentValue;

      // Check if currentValue is 0 & keypadValue is dot, we want to type 0.23 for example
      if ( data.currentValue === '0' && keypadValue === '.' ) {
        // Assign keypadValue to currentValue
        data.currentValue = data.currentValue + keypadValue;

        // Check if currentValue is 0, if this is try we want to type a number, we are not starting with dot
      } else if ( data.currentValue === '0' ) {
        data.currentValue = keypadValue;

      } else {
        // Does previousValue have dot if not
        if ( data.previousValue.indexOf('.') == -1 ) {
          data.currentValue = data.currentValue + keypadValue;

          // Does keypadValue have dot?
        } else if ( keypadValue !== '.' ) {
          data.currentValue = data.currentValue + keypadValue;
        }
      }
    },

    storeOperation: function(operationValue) {
      data.currentFunc = operationValue;
      console.log(data.currentFunc);
    },

    clear: function(type, currentFunc) {
      //data.previousValue = data.currentValue;

      console.log(currentFunc);

      if(currentFunc === '') {
        data.currentValue = '0';
        data.previousValue = '0';
      } else {
        data.currentValue = '0';
      }
    },

    calculate: function(operation) {
      return data.currentValue;
    },

    getData: function() {
      return data;
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
    keypad: '.keypad span:not(.clear-all):not(.negate):not(.percent)',
    sidebar: '.sidebar span'
  };

  return {
    updateDisplayLabel: function(val) {
      document.querySelector(DOMStrings.displayLabel).textContent = val;
    },

    updateClearLabel: function(type) {
      //console.log(type);

      if (type === 'C') {
        document.querySelector(DOMStrings.clear).textContent = 'AC';
      } else {
        document.querySelector(DOMStrings.clear).textContent = 'C';
      }
    },

    clearDisplayLabel: function() {
      document.querySelector(DOMStrings.displayLabel).textContent = '0';
    },

    // Get value of clicked keypad 0 - 9 plus . sign
    getKeypadValue: function(keypadValue) {
      return keypadValue.target.innerText
    },

    getOperationValue: function(operationValue) {
      return operationValue.target.className;
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

    // Add Event Listener to all keypadas 0 - 9 and dot
    UICtrl.nodeListForEach(keypads, function(cur) {
      cur.addEventListener('click', ctrlKeypad);
    });

    // Add Event Listener to all operations in sidebar
    UICtrl.nodeListForEach(sidebar, function(cur) {
      cur.addEventListener('click', ctrlOperation);
    });

    // Add Event Listener to operations inside keypad

  };

  var ctrlClear = function(event) {
    var type, currentFunc, data;

    data = CalcCtrl.getData();

    // 1. Get clear type, Clear or Clear All, get current function if any
    type = event.target.textContent;
    currentFunc = data.currentFunc;
    console.log(currentFunc);

    // 2. Update current state depending if its is Clear or Clear All func
    CalcCtrl.clear(type, currentFunc);

    // 3. Update Clear All label
    UICtrl.updateClearLabel(type);

    // 4. Clear display
    UICtrl.clearDisplayLabel();
  }

  var ctrlKeypad = function(event) {
    var keypadValue, displayValue;

    // 1. Get keypadValue
    keypadValue = UICtrl.getKeypadValue(event);

    // 2. Update clear label from AC to C
    UICtrl.updateClearLabel('AC');

    // 3. Store previous value
    CalcCtrl.storeKeypadValue(keypadValue);

    // 4. Calculate new value
    displayValue = CalcCtrl.calculate();

    // 5. Display new displayLabel value
    UICtrl.updateDisplayLabel(displayValue);
  }

  var ctrlOperation = function(event) {
    // 1. Get operationValue
    operationValue = UICtrl.getOperationValue(event);

    // 2. Store current operation
    CalcCtrl.storeOperation(operationValue);
  }

  return {
    init: function() {
      console.log('Application has started.');
      setupEventListeners();
    }
  }

})(CalcController, UIController);

controller.init();