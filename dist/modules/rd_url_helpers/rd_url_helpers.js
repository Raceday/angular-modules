(function() {
  var Factory;

  Factory = function($location) {
    var _subdomain;
    _subdomain = function() {
      return $location.host().split('.')[0];
    };
    return {
      subdomain: _subdomain
    };
  };

  Factory.$inject = ['$location'];

  angular.module('raceday.urlHelpers', []).factory('rdUrlHelpers', Factory);

}).call(this);
