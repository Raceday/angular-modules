# src/modules/rd_forms/rd_form_group.coffee

Controller = ( rdModelHelpers ) ->
  ctrl = @
  ctrl.controlId = ctrl.id || ctrl.modelProp
  ctrl.errors = []
  ctrl.showFormControl = false

  ctrl.fieldErrors = ->
    errors = ctrl.form.modelPropErrors( ctrl.modelProp )

    if errors.length > 0
      errors.join(', ')

  # used to connect the form-group to a rd-input
  ctrl.addFormControl = ( formControlCtrl ) ->
    console.debug('Only 1 rd-input can be nested under a rd-input-wrapper') if ctrl.formControl
    ctrl.formControl = formControlCtrl
    return {
      label: ctrl.label
      getValue: ( callback ) ->
        ctrl.form.getModelPropValue ctrl.modelProp, callback
    }

  ctrl.addErrors = ( errors ) ->
    ctrl.removeErrors()
    errors.forEach ( error ) ->
      ctrl.errors.push error

  ctrl.removeErrors = ->
    do ctrl.errors.pop() while ctrl.errors.length > 0

  # bubble up
  ctrl.inputValueChanged = ( value ) ->
    ctrl.form.inputValueChanged( ctrl.modelProp, value )

  # send to input
  ctrl.modelValueChanged = ( value ) ->
    ctrl.formControl.updateValue( value )

  ctrl.$onInit = ->
    # must be within $onInit to guarantee ctrl.form exists
    ctrl.form.addFormGroup( ctrl.modelProp, ctrl, ctrl.label )

  return null

Controller.$inject = ['rdModelHelpers']

template = '
  <div class="form-group" ng-class="{ \'has-danger\': $ctrl.fieldErrors() }">
    <label for="$ctrl.id" ng-bind="$ctrl.label" ng-if="$ctrl.label"></label>
    <ng-transclude></ng-transclude>
    <span class="form-control-error" ng-show="$ctrl.fieldErrors()">{{ $ctrl.fieldErrors() }}</span>
    <span class="form-control-hint" ng-bind="$ctrl.hint"></span>
  </div>'

angular.module('raceday.forms').component "rdFormGroup", {
  controller: Controller
  template: template
  transclude: true
  bindings: {
    id: '@'
    hint: '@'
    label: '@'
    modelProp: '@'
  },
  require: {
    form: '^rdForm'
  }
}
