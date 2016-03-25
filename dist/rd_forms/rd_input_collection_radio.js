(function() {
  var Controller, template;

  Controller = function() {
    var ctrl;
    ctrl = this;
    ctrl.form = {
      value: ctrl.selected
    };
    ctrl.onSelect = function($event) {
      $event.preventDefault();
      ctrl.onChange({
        value: ctrl.form.value
      });
      return false;
    };
    return null;
  };

  template = function($attrs, rdInputHelpers) {
    var classes;
    classes = rdInputHelpers.combineStrings('btn btn-sm btn-secondary', $attrs.inputClass);
    return "<div class=\"btn-group\"> <a class=\"" + classes + "\" ng-click=\"$ctrl.onSelect($event)\" ng-repeat=\"item in $ctrl.collection\" ng-model=\"$ctrl.form.value\" ng-bind=\"item\" uib-btn-radio=\"item\" ></a> </div>";
  };

  Controller.$inject = [];

  angular.module('raceday.forms').component('rdInputCollectionRadio', {
    bindings: {
      collection: '<',
      onChange: "&",
      selected: '<'
    },
    controller: Controller,
    template: template
  });

}).call(this);
