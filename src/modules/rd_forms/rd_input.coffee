# src/modules/rd_forms/rd_input.coffee

method = ( value ) ->
  if typeof(value) == 'undefined' then 'onChange' else 'delayOnChange'

Controller = ($timeout, $element, $scope, $attrs) ->
  ctrl = @
  ctrl.form = {
    value: null
  }

  timeout = null
  timeoutNumber = (ctrl.onChangeDelay || 200)

  ctrl.onChange = ->
    if typeof($attrs.onChangeDelay) == 'undefined'
      inputValueChanged()
    else
      ctrl.delayOnChange()

  ctrl.delayOnChange = ->
    $timeout.cancel(timeout) if timeout

    timeout = $timeout ->
      inputValueChanged()
    , timeoutNumber

  ctrl.updateValue = ( value ) ->
    ctrl.form.value = value

  ctrl.$onInit = ->
    ctrl.placeholder = if ctrl.inputPlaceholder == 'false' then '' else ctrl.inputPlaceholder

    if ctrl.formGroupCtrl
      formGroupCtrl = ctrl.formGroupCtrl.addFormControl( ctrl )
      ctrl.controlId = formGroupCtrl.id
      formGroupCtrl.getValue( ctrl.updateValue )

      if typeof(ctrl.placeholder) == 'undefined'
        ctrl.placeholder = formGroupCtrl.label

    if ctrl.autofocus
      $timeout ->
        input = $element.find 'input'
        input[0].focus()
      , 0


  inputValueChanged = ->
    if ctrl.formGroupCtrl
      ctrl.formGroupCtrl.inputValueChanged( ctrl.form.value )
    else
      ctrl.onChangeCallback({ value: ctrl.form.value })

  return null

Controller.$inject = ['$timeout', '$element', '$scope', '$attrs']

template = ($attrs, rdInputHelpers) ->
  classes = rdInputHelpers.combineStrings( 'form-control', $attrs.inputClass )

  "<input type=\"text\"
          id=\"{{ $ctrl.controlId }}\"
          class=\"#{ classes }\"
          ng-change=\"$ctrl.onChange()\"
          ng-model=\"$ctrl.form.value\"
          placeholder=\"{{ $ctrl.placeholder }}\">"

template.$inject = ['$attrs', 'rdInputHelpers']

angular.module('raceday.forms').component 'rdInput', {
  bindings: {
    autofocus: '<'
    hint: '@'
    onChangeCallback: "&onChange"
    onChangeDelay: '<'
    inputPlaceholder: '@placeholder'
    prop: '@'
  }
  controller: Controller,
  require: {
    formGroupCtrl: '^?rdFormGroup'
  }
  template: template
}
