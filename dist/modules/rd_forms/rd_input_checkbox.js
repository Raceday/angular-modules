(function() {
  var Controller, template;

  Controller = function($scope) {
    var ctrl, killWatcher;
    ctrl = this;
    ctrl.input = {
      value: ctrl.value
    };
    killWatcher = $scope.$watch(function() {
      return ctrl.input.value;
    }, function(newValue, oldValue) {
      return ctrl.onChange({
        value: ctrl.input.value
      });
    });
    $scope.$on('$destroy', function() {
      return killWatcher();
    });
    return null;
  };

  Controller.$inject = ['$scope'];

  template = '<div class="checkbox"> <label> <input  type="checkbox" ng-model="$ctrl.input.value"> {{ $ctrl.label }} </label> </div>';

  angular.module('raceday.forms').component('rdInputCheckbox', {
    bindings: {
      onChange: "&",
      label: '@',
      value: "<"
    },
    controller: Controller,
    template: template
  });

}).call(this);
