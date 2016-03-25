# src/modules/rd_forms/rd_input_collection_radio.coffee

Controller = () ->
  ctrl = @
  ctrl.form = {
    value: ctrl.selected
  }

  ctrl.onSelect = ( $event ) ->
    $event.preventDefault()
    ctrl.onChange({ value: ctrl.form.value })
    false

  return null

template = ($attrs, rdInputHelpers) ->
  classes = rdInputHelpers.combineStrings( 'btn btn-sm btn-secondary', $attrs.inputClass )
  "<div class=\"btn-group\">
    <a
      class=\"#{ classes }\"
      ng-click=\"$ctrl.onSelect($event)\"
      ng-repeat=\"item in $ctrl.collection\"
      ng-model=\"$ctrl.form.value\"
      ng-bind=\"item\"
      uib-btn-radio=\"item\"
    ></a>
  </div>"

Controller.$inject = []

angular.module('raceday.forms').component 'rdInputCollectionRadio', {
  bindings: {
    collection: '<'
    onChange: "&"
    selected: '<'
  }
  controller: Controller,
  template: template
}
