(function() {
  'use strict';
  var Service;

  Service = function($window) {
    return $window.moment;
  };

  Service.$inject = ['$window'];

  angular.module('raceday.vendor.moment', []).service('moment', Service);

}).call(this);
