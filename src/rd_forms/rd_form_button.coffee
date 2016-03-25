'use strict'

# Directive: rdFormButton

Controller = ($scope, $element, $attrs, $sce, $timeout, rdActivityService)->
  ctrl = @
  ctrl.isActive = rdActivityService.isActive
  ctrl.text = $sce.trustAsHtml( ctrl.disableWith )

  return null

Controller.$inject = ['$scope', '$element', '$attrs', '$sce', '$timeout', 'rdActivityService']

template = '
  <button class="btn btn-primary" type="submit" ng-disabled="$ctrl.isActive( $ctrl.id )" ng-class="$ctrl.buttonClass">
    <span class="disabled-text">
      <i class="fa fa-spinner fa-spin"></i>
      <span ng-bind-html="$ctrl.text"></span>
    </span>
    <span class="non-disabled-text" ng-transclude></span>
  </button>'

angular.module('raceday.forms').component 'rdFormButton', {
  bindings: {
    buttonClass: '@'
    disableWith: '@'
    id: '=disableId'
  }
  controller: Controller
  template: template,
  transclude: true
}
