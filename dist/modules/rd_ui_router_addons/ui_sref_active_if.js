(function() {
  var Controller, Directive;

  Controller = function($rootScope, $state, $element, $attrs, $scope) {
    var killWatcher, state, update;
    state = $attrs.uiSrefActiveIf;
    update = function() {
      if ($state.includes(state) || $state.is(state)) {
        return $element.addClass("active");
      } else {
        return $element.removeClass("active");
      }
    };
    killWatcher = $rootScope.$on('$stateChangeSuccess', update);
    $scope.$on('$destroy', function() {
      return killWatcher();
    });
    update();
    return null;
  };

  Controller.$inject = ['$rootScope', '$state', '$element', '$attrs', '$scope'];

  Directive = function() {
    return {
      restrict: "A",
      controller: Controller
    };
  };

  angular.module('raceday.uiRouterAddons').directive('uiSrefActiveIf', Directive);

}).call(this);
