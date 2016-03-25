(function() {
  var Controller, template;

  Controller = function() {
    var ctrl, letterChange;
    ctrl = this;
    ctrl.letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    ctrl.letterFilter = '';
    ctrl.onClick = function(letter) {
      ctrl.letterFilter = letter;
      return letterChange();
    };
    ctrl.clearFilter = function() {
      ctrl.letterFilter = '';
      return letterChange();
    };
    letterChange = function() {
      return ctrl.onSelect({
        letter: ctrl.letterFilter
      });
    };
    return null;
  };

  template = '<div class="letter-browser"> <div class="btn-group"> <a class="btn btn-sm btn-secondary" ng-click="$ctrl.onClick(letter)" ng-class="{ active: $ctrl.letterFilter == letter }" ng-repeat="letter in $ctrl.letters" ng-bind="letter" ></a> </div> <a class="btn btn-sm btn-link" ng-click="$ctrl.clearFilter()">clear</a> </div>';

  angular.module('raceday.search').component('letterBrowser', {
    bindings: {
      onSelect: "&"
    },
    controller: Controller,
    template: template
  });

}).call(this);
