(function() {
  'use strict';
  var Controller, Directive;

  Controller = function($scope, rdActivityService) {
    var ctrl, setClasses;
    ctrl = this;
    ctrl.active = rdActivityService.isActive;
    $scope.text = $scope.text || 'Loading...';
    (setClasses = function() {
      var _classes;
      if ($scope.center === void 0) {
        $scope.center = true;
      }
      _classes = [];
      if (!$scope.center) {
        _classes.push('not-centered');
      }
      return ctrl.classes = _classes.join(' ');
    })();
    return null;
  };

  Controller.$inject = ['$scope', 'rdActivityService'];

  Directive = function() {
    return {
      restrict: 'EA',
      controller: Controller,
      controllerAs: 'rdActivityCtrl',
      scope: {
        ajaxId: '=id',
        text: '@text',
        center: '=?'
      },
      template: '<div class="rd-activity-container" ng-if="rdActivityCtrl.active( ajaxId )" ng-class="rdActivityCtrl.classes"> <i class="fa fa-spinner fa-spin"></i> <span ng-bind="text"></span> </div>'
    };
  };

  angular.module('raceday.activity').directive('rdActivity', Directive);

}).call(this);
