# source/app/modules/rd_search/letter_browser.coffee

Controller = () ->
  ctrl = @
  ctrl.letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')
  ctrl.letterFilter = ''

  ctrl.onClick = (letter) ->
    ctrl.letterFilter = letter
    letterChange()

  ctrl.clearFilter = ->
    ctrl.letterFilter = ''
    letterChange()

  letterChange = ->
    ctrl.onSelect({letter: ctrl.letterFilter})

  return null

template = '
  <div class="letter-browser">
    <div class="btn-group">
      <a
        class="btn btn-sm btn-secondary"
        ng-click="$ctrl.onClick(letter)"
        ng-class="{ active: $ctrl.letterFilter == letter }"
        ng-repeat="letter in $ctrl.letters"
        ng-bind="letter"
      ></a>
    </div>
    <a class="btn btn-sm btn-link" ng-click="$ctrl.clearFilter()">clear</a>
  </div>
'

Controller.$inject = []

angular.module('rdSearch').component 'letterBrowser', {
  bindings: {
    onSelect: "&"
  }
  controller: Controller,
  template: template
}
