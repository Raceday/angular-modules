(function() {
  var Controller, template,
    hasProp = {}.hasOwnProperty;

  Controller = function(rdModelHelpers, $scope, _) {
    var clearErrors, ctrl, formGroups;
    ctrl = this;
    formGroups = {};
    ctrl.modelErrors = {};
    ctrl.fullErrors = [];
    ctrl.addFormGroup = function(modelProp, fgCtrl, fgLabel) {
      if (formGroups[modelProp]) {
        throw "'" + modelProp + "' has already been added to rd-form";
      }
      return formGroups[modelProp] = {
        ctrl: fgCtrl,
        label: fgLabel
      };
    };
    ctrl.inputValueChanged = function(modelProp, value) {
      return ctrl.model[modelProp] = value;
    };
    ctrl.modelHasChanged = function(data) {
      var modelProp, ref, results, value;
      ref = ctrl.model;
      results = [];
      for (modelProp in ref) {
        if (!hasProp.call(ref, modelProp)) continue;
        value = ref[modelProp];
        results.push(formGroups[modelProp].ctrl.modelValueChanged(data[modelProp]));
      }
      return results;
    };
    ctrl.modelPropErrors = function(modelProp) {
      var e, error1;
      try {
        return ctrl.modelErrors[modelProp] || [];
      } catch (error1) {
        e = error1;
        return [];
      }
    };
    ctrl.getModelPropValue = function(modelProp, callback) {
      return callback(ctrl.model[modelProp]);
    };
    ctrl.onSubmit = function() {
      clearErrors();
      return ctrl.onSubmitCallback({
        data: ctrl.model,
        onError: ctrl.onError
      });
    };
    ctrl.onError = function(errors) {
      var error, prop, ref, results;
      ctrl.modelErrors = errors;
      ref = ctrl.modelErrors;
      results = [];
      for (prop in ref) {
        if (!hasProp.call(ref, prop)) continue;
        error = ref[prop];
        if (error && error.length > 0) {
          results.push(ctrl.fullErrors.push(formGroups[prop].label + " " + error));
        } else {
          results.push(void 0);
        }
      }
      return results;
    };
    clearErrors = function() {
      var error, prop, ref, results;
      ref = ctrl.modelErrors;
      for (prop in ref) {
        if (!hasProp.call(ref, prop)) continue;
        error = ref[prop];
        delete ctrl.modelErrors[prop];
      }
      results = [];
      while (ctrl.fullErrors.length > 0) {
        results.push(ctrl.fullErrors.pop());
      }
      return results;
    };
    if (ctrl.modelSubscriber) {
      ctrl.modelSubscriber(ctrl.modelHasChanged);
    }
    return null;
  };

  Controller.$inject = ['rdModelHelpers', '$scope', '_'];

  template = '<form ng-submit="$ctrl.onSubmit()"> <rd-errors-block errors="$ctrl.fullErrors"></rd-errors-block> <ng-transclude></ng-transclude> </form>';

  angular.module('raceday.forms').component("rdForm", {
    controller: Controller,
    template: template,
    transclude: true,
    bindings: {
      model: '<',
      onSubmitCallback: '&onSubmit',
      modelSubscriber: '=?'
    }
  });

}).call(this);
