(function() {
  var Factory;

  Factory = function() {
    var _klass;
    _klass = function() {
      var factory, subscribers;
      factory = this;
      subscribers = [];
      factory.subscribe = function(subscriber) {
        return subscribers.push(subscriber);
      };
      factory.publish = function(data) {
        return subscribers.forEach(function(subscriber) {
          return subscriber(data);
        });
      };
      return null;
    };
    return _klass;
  };

  angular.module('raceday.forms').factory('rdModelPubSub', Factory);

}).call(this);
