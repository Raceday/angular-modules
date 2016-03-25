(function() {
  'use strict';
  var Service;

  Service = function($window) {
    var service;
    service = this;
    return service._ = $window._;
  };

  Service.$inject = ['$window'];

  angular.module('lodash', []).service('_', Service);

}).call(this);
