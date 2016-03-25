(function() {
  var Controller, method, template;

  method = function(value) {
    if (typeof value === 'undefined') {
      return 'onChange';
    } else {
      return 'delayOnChange';
    }
  };

  Controller = function($timeout, $element, $scope, $attrs) {
    var ctrl, inputValueChanged, timeout, timeoutNumber;
    ctrl = this;
    ctrl.form = {
      value: null
    };
    timeout = null;
    timeoutNumber = ctrl.onChangeDelay || 200;
    ctrl.onChange = function() {
      if (typeof $attrs.onChangeDelay === 'undefined') {
        return inputValueChanged();
      } else {
        return ctrl.delayOnChange();
      }
    };
    ctrl.delayOnChange = function() {
      if (timeout) {
        $timeout.cancel(timeout);
      }
      return timeout = $timeout(function() {
        return inputValueChanged();
      }, timeoutNumber);
    };
    ctrl.updateValue = function(value) {
      return ctrl.form.value = value;
    };
    ctrl.$onInit = function() {
      var formGroupCtrl;
      ctrl.placeholder = ctrl.inputPlaceholder === 'false' ? '' : ctrl.inputPlaceholder;
      if (ctrl.formGroupCtrl) {
        formGroupCtrl = ctrl.formGroupCtrl.addFormControl(ctrl);
        ctrl.controlId = formGroupCtrl.id;
        formGroupCtrl.getValue(ctrl.updateValue);
        if (typeof ctrl.placeholder === 'undefined') {
          ctrl.placeholder = formGroupCtrl.label;
        }
      }
      if (ctrl.autofocus) {
        return $timeout(function() {
          var input;
          input = $element.find('input');
          return input[0].focus();
        }, 0);
      }
    };
    inputValueChanged = function() {
      if (ctrl.formGroupCtrl) {
        return ctrl.formGroupCtrl.inputValueChanged(ctrl.form.value);
      } else {
        return ctrl.onChangeCallback({
          value: ctrl.form.value
        });
      }
    };
    return null;
  };

  Controller.$inject = ['$timeout', '$element', '$scope', '$attrs'];

  template = function($attrs, rdInputHelpers) {
    var classes;
    classes = rdInputHelpers.combineStrings('form-control', $attrs.inputClass);
    return "<input type=\"text\" id=\"{{ $ctrl.controlId }}\" class=\"" + classes + "\" ng-change=\"$ctrl.onChange()\" ng-model=\"$ctrl.form.value\" placeholder=\"{{ $ctrl.placeholder }}\">";
  };

  template.$inject = ['$attrs', 'rdInputHelpers'];

  angular.module('raceday.forms').component('rdInput', {
    bindings: {
      autofocus: '<',
      hint: '@',
      onChangeCallback: "&onChange",
      onChangeDelay: '<',
      inputPlaceholder: '@placeholder',
      prop: '@'
    },
    controller: Controller,
    require: {
      formGroupCtrl: '^?rdFormGroup'
    },
    template: template
  });

}).call(this);
