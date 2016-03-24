'use strict'

Controller = ( $scope, rdActivityService ) ->
  ctrl = @
  ctrl.active = rdActivityService.isActive
  $scope.text = $scope.text || 'Loading...'

  do setClasses = ->
    if $scope.center == undefined
      $scope.center = true

    _classes = []
    _classes.push('not-centered') unless $scope.center
    ctrl.classes = _classes.join(' ')

  return null

Controller.$inject = [ '$scope', 'rdActivityService']

Directive = ->

  return {
    restrict: 'EA',
    controller: Controller
    controllerAs: 'rdActivityCtrl'
    scope:
      ajaxId: '=id'
      text: '@text'
      center: '=?'
    template: '
      <div class="rd-activity-container" ng-if="rdActivityCtrl.active( ajaxId )" ng-class="rdActivityCtrl.classes">
        <i class="fa fa-spinner fa-spin"></i>
        <span ng-bind="text"></span>
      </div>
    '
  }

angular.module('rdActivity').directive 'rdActivity', Directive
