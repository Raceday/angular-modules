(function() {
  var Factory;

  Factory = function($rootScope) {
    var all, last, listen, routeHistory;
    routeHistory = [];
    listen = function() {
      var killWatcher;
      killWatcher = $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
        if (from.name.length > 0) {
          return routeHistory.push({
            route: from.name,
            routeParams: fromParams
          });
        }
      });
      return $rootScope.$on('$destroy', function() {
        return killWatcher();
      });
    };
    all = function() {
      return routeHistory;
    };
    last = function() {
      if (routeHistory.length > 0) {
        return routeHistory[routeHistory.length - 1];
      } else {
        return null;
      }
    };
    return {
      all: all,
      last: last,
      listen: listen
    };
  };

  Factory.$inject = ['$rootScope'];

  angular.module('raceday.uiRouterAddons').factory('rdStateHistory', Factory);

}).call(this);
