(function() {
  'use strict';
  var Service;

  Service = function($location) {
    var _service;
    _service = this;
    _service.subdomain = $location.host().split('.')[0];
    return _service;
  };

  Service.$inject = ['$location'];

  angular.module('raceday.urlHelpers', []).factory('rdUrlHelpers', Service);

}).call(this);
