(function() {
  'use strict';
  var Service;

  Service = function($window) {
    var service;
    service = this;
    return service.markdown = $window.markdown;
  };

  Service.$inject = ['$window'];

  angular.module('raceday.vendor.markdown', []).service('markdown', Service);

}).call(this);
