(function() {
  var Controller, template;

  Controller = function(rdStringHelpers) {
    var ctrl;
    ctrl = this;
    ctrl.showErrors = function() {
      return ctrl.errors.length > 0;
    };
    ctrl.errorString = function() {
      return rdStringHelpers.pluralize(ctrl.errors.length, 'error');
    };
    return null;
  };

  Controller.$inject = ['rdStringHelpers'];

  template = '<div class="alert alert-danger" ng-if="$ctrl.showErrors()"> <h5>The following {{ $ctrl.errorString() }} occured</h5> <ul class="list-unstyled"> <li ng-repeat="error in $ctrl.errors" ng-bind="error"></li> </ul> </div>';

  angular.module('raceday.errors').component('rdErrorsBlock', {
    bindings: {
      errors: '='
    },
    controller: Controller,
    template: template
  });

}).call(this);
