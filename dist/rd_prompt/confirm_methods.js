(function() {
  'use strict';
  var Service;

  Service = function() {
    return function() {
      var _service;
      _service = {};
      _service.setup = function(options) {
        return {
          submitHandler: options.done,
          addModalContentScope: _service.addModalContentScope
        };
      };
      _service.addModalContentScope = function(options) {
        return options;
      };
      return _service;
    };
  };

  angular.module('raceday.prompt').service('rdConfirmMethods', Service);

}).call(this);
