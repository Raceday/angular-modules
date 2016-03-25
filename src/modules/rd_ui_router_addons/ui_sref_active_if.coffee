# src/modules/rd_ui_router_addons/ui_sref_active_if.coffee

Controller = ($rootScope, $state, $element, $attrs, $scope) ->
  state = $attrs.uiSrefActiveIf;

  update = ->
    if $state.includes(state) || $state.is(state)
      $element.addClass("active")
    else
      $element.removeClass("active")

  killWatcher = $rootScope.$on '$stateChangeSuccess', update
  $scope.$on '$destroy', ->
    killWatcher()

  update()

  return null

Controller.$inject = ['$rootScope', '$state', '$element', '$attrs', '$scope']

Directive = ->
  return {
    restrict: "A",
    controller: Controller
  };

angular.module('raceday.uiRouterAddons').directive 'uiSrefActiveIf', Directive
