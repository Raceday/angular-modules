(function() {
  var Controller, Directive;

  Controller = function($rootScope, $state, $element, $attrs) {
    var state, update;
    state = $attrs.uiSrefActiveIf;
    update = function() {
      if ($state.includes(state) || $state.is(state)) {
        return $element.addClass("active");
      } else {
        return $element.removeClass("active");
      }
    };
    $rootScope.$on('$stateChangeSuccess', update);
    update();
    return null;
  };

  Controller.$inject = ['$rootScope', '$state', '$element', '$attrs'];

  Directive = function() {
    return {
      restrict: "A",
      controller: Controller
    };
  };

  angular.module('raceday.uiRouterAddons').directive('uiSrefActiveIf', Directive);

}).call(this);
