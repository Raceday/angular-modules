Controller = ($rootScope, $state, $element, $attrs) ->
  state = $attrs.uiSrefActiveIf;

  update = ->
    if $state.includes(state) || $state.is(state)
      $element.addClass("active")
    else
      $element.removeClass("active")

  $rootScope.$on '$stateChangeSuccess', update
  update()

  return null

Controller.$inject = ['$rootScope', '$state', '$element', '$attrs']

Directive = ->
  return {
    restrict: "A",
    controller: Controller
  };

angular.module('rdUiRouterAddons').directive 'uiSrefActiveIf', Directive
