
Controller = ( rdModelHelpers, $scope, _ ) ->
  ctrl = @
  formGroups = {}
  ctrl.modelErrors = {}
  ctrl.fullErrors = []

  ctrl.addFormGroup = ( modelProp, fgCtrl, fgLabel ) ->
    throw("'#{ modelProp }' has already been added to rd-form") if formGroups[modelProp]
    formGroups[modelProp] = {
      ctrl: fgCtrl
      label: fgLabel
    }

  ctrl.inputValueChanged = ( modelProp, value ) ->
    ctrl.model[modelProp] = value

  ctrl.modelHasChanged = ( data ) ->
    for own modelProp, value of ctrl.model
      formGroups[modelProp].ctrl.modelValueChanged( data[modelProp] )

  ctrl.modelPropErrors = ( modelProp ) ->
    try
      ctrl.modelErrors[modelProp] || []
    catch e
      []

  ctrl.getModelPropValue = ( modelProp, callback ) ->
    callback( ctrl.model[modelProp] )

  ctrl.onSubmit = ->
    clearErrors()
    ctrl.onSubmitCallback({ data: ctrl.model, onError: ctrl.onError })

  ctrl.onError = ( errors ) ->
    ctrl.modelErrors = errors

    for own prop, error of ctrl.modelErrors
      if error && error.length > 0
        ctrl.fullErrors.push "#{ formGroups[prop].label } #{ error }"

  clearErrors = ->
    for own prop, error of ctrl.modelErrors
      delete ctrl.modelErrors[prop]

    do ctrl.fullErrors.pop while ctrl.fullErrors.length > 0

  ctrl.modelSubscriber(ctrl.modelHasChanged) if ctrl.modelSubscriber

  return null

Controller.$inject = ['rdModelHelpers', '$scope', '_']

template = '
  <form ng-submit="$ctrl.onSubmit()">
    <rd-form-errors></rd-form-errors>
    <ng-transclude></ng-transclude>
  </form>'

angular.module('raceday.forms').component "rdForm", {
  controller: Controller
  template: template
  transclude: true
  bindings: {
    model: '<'
    onSubmitCallback: '&onSubmit'
    modelSubscriber: '=?'
  }
}
