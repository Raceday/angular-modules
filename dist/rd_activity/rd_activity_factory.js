(function() {
  'use strict';
  var Factory;

  Factory = function() {
    var _store, end, get, start;
    _store = {};
    get = function(ajaxId) {
      return _store[ajaxId];
    };
    start = function(ajaxId) {
      return _store[ajaxId] = true;
    };
    end = function(ajaxId) {
      return _store[ajaxId] = false;
    };
    return {
      get: get,
      start: start,
      end: end,
      init: end
    };
  };

  angular.module('raceday.activity').factory('rdActivityFactory', Factory);

}).call(this);
