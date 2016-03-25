(function() {
  var Service;

  Service = function(rdActivityFactory, rdEVENTS, $rootScope) {
    var ActivityIndicator, _broadcast, _service;
    _service = this;
    ActivityIndicator = function(id) {
      this.id = id;
      this.start = function() {
        return _service.start(id);
      };
      this.stop = function() {
        return _service.end(id);
      };
      this.isActive = function() {
        return _service.isActive(id);
      };
      return this;
    };
    _service.init = function(ajaxId) {
      var _ajaxId;
      _ajaxId = ajaxId || (Math.random() * (100000 - 10000) + 10000).toString();
      rdActivityFactory.init(_ajaxId);
      return new ActivityIndicator(_ajaxId);
    };
    _service.start = function(ajaxId) {
      rdActivityFactory.start(ajaxId);
      return _broadcast(rdEVENTS.ajax.init, ajaxId);
    };
    _service.isActive = function(ajaxId) {
      return rdActivityFactory.get(ajaxId);
    };
    _service.end = function(ajaxId) {
      rdActivityFactory.end(ajaxId);
      return _broadcast(rdEVENTS.ajax.complete, ajaxId);
    };
    _broadcast = function(eventName, ajaxId) {
      return $rootScope.$broadcast(eventName, {
        id: ajaxId
      });
    };
    return _service;
  };

  Service.$inject = ['rdActivityFactory', 'rdEVENTS', '$rootScope'];

  angular.module('raceday.activity').service('rdActivityService', Service);

}).call(this);
