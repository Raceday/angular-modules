
template = '
  <div class="alert alert-danger" ng-if="$ctrl.rdFormCtrl.fullErrors.length > 0">
    <h5>The following {{ $ctrl.errorString() }} occured</h5>
    <ul class="list-unstyled">
      <li ng-repeat="error in $ctrl.rdFormCtrl.fullErrors" ng-bind="error"></li>
    </ul>
  </div>'
#
Controller = ( rdStringHelpers ) ->
  ctrl = @
  ctrl.errorString = ->
    rdStringHelpers.pluralize( ctrl.rdFormCtrl.fullErrors.length, 'error' )

  return null

Controller.$inject = ['rdStringHelpers']

angular.module('raceday.forms').component "rdFormErrors", {
  controller: Controller
  template: template
  require: {
    rdFormCtrl: '^rdForm'
  }
}
