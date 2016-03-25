# src/modules/rd_forms/rd_input_checkbox.coffee

Controller = ($scope) ->
  ctrl = @
  ctrl.input = {
    value: ctrl.value
  }

  killWatcher = $scope.$watch ->
    ctrl.input.value
  , (newValue, oldValue) ->
    ctrl.onChange({ value: ctrl.input.value })

  $scope.$on '$destroy', ->
    killWatcher()

  # $ctrl.onChange({ value: $ctrl.input.value })

  return null

Controller.$inject = ['$scope']

template = '
  <div class="checkbox">
    <label>
      <input  type="checkbox"
              ng-model="$ctrl.input.value">
      {{ $ctrl.label }}
    </label>
  </div>
'

angular.module('raceday.forms').component 'rdInputCheckbox', {
  bindings: {
    onChange: "&"
    label: '@'
    value: "<"
  }
  controller: Controller,
  template: template
}
