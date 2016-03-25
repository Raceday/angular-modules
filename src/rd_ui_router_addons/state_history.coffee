Factory = ( $rootScope ) ->
  routeHistory = []

  listen = ->
    killWatcher = $rootScope.$on '$stateChangeSuccess', (event, to, toParams, from, fromParams) ->
      routeHistory.push({ route: from.name, routeParams: fromParams }) if from.name.length > 0

    $rootScope.$on '$destroy', ->
      killWatcher()

  all = ->
    routeHistory

  last = ->
    if routeHistory.length > 0
      routeHistory[routeHistory.length - 1]
    else
      null

  return {
    all: all
    last: last
    listen: listen
  }

Factory.$inject = ['$rootScope']

angular.module('raceday.uiRouterAddons').factory 'rdStateHistory', Factory
