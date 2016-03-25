(function() {
  var Controller, template;

  Controller = function(rdModelHelpers) {
    var ctrl;
    ctrl = this;
    ctrl.controlId = ctrl.id || ctrl.modelProp;
    ctrl.errors = [];
    ctrl.showFormControl = false;
    ctrl.fieldErrors = function() {
      var errors;
      errors = ctrl.form.modelPropErrors(ctrl.modelProp);
      if (errors.length > 0) {
        return errors.join(', ');
      }
    };
    ctrl.addFormControl = function(formControlCtrl) {
      if (ctrl.formControl) {
        console.debug('Only 1 rd-input can be nested under a rd-input-wrapper');
      }
      ctrl.formControl = formControlCtrl;
      return {
        label: ctrl.label,
        getValue: function(callback) {
          return ctrl.form.getModelPropValue(ctrl.modelProp, callback);
        }
      };
    };
    ctrl.addErrors = function(errors) {
      ctrl.removeErrors();
      return errors.forEach(function(error) {
        return ctrl.errors.push(error);
      });
    };
    ctrl.removeErrors = function() {
      var results;
      results = [];
      while (ctrl.errors.length > 0) {
        results.push(ctrl.errors.pop()());
      }
      return results;
    };
    ctrl.inputValueChanged = function(value) {
      return ctrl.form.inputValueChanged(ctrl.modelProp, value);
    };
    ctrl.modelValueChanged = function(value) {
      return ctrl.formControl.updateValue(value);
    };
    ctrl.$onInit = function() {
      return ctrl.form.addFormGroup(ctrl.modelProp, ctrl, ctrl.label);
    };
    return null;
  };

  Controller.$inject = ['rdModelHelpers'];

  template = '<div class="form-group" ng-class="{ \'has-danger\': $ctrl.fieldErrors() }"> <label for="$ctrl.id" ng-bind="$ctrl.label" ng-if="$ctrl.label"></label> <ng-transclude></ng-transclude> <span class="form-control-error" ng-show="$ctrl.fieldErrors()">{{ $ctrl.fieldErrors() }}</span> <span class="form-control-hint" ng-bind="$ctrl.hint"></span> </div>';

  angular.module('raceday.forms').component("rdFormGroup", {
    controller: Controller,
    template: template,
    transclude: true,
    bindings: {
      id: '@',
      hint: '@',
      label: '@',
      modelProp: '@'
    },
    require: {
      form: '^rdForm'
    }
  });

}).call(this);
