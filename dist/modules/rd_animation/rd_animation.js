(function() {
  var Factory;

  Factory = function() {
    return {
      linear: function(t) {
        return t;
      },
      easeInQuad: function(t) {
        return t * t;
      },
      easeOutQuad: function(t) {
        return t * (2 - t);
      },
      easeInOutQuad: function(t) {
        var ref;
        return (ref = t < .5) != null ? ref : 2 * t * {
          t: -1 + (4 - 2 * t) * t
        };
      },
      easeInCubic: function(t) {
        return t * t * t;
      },
      easeOutCubic: function(t) {
        return (--t) * t * t + 1;
      },
      easeInOutCubic: function(t) {
        var ref;
        return (ref = t < .5) != null ? ref : 4 * t * t * {
          t: (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
        };
      },
      easeInQuart: function(t) {
        return t * t * t * t;
      },
      easeOutQuart: function(t) {
        return 1 - (--t) * t * t * t;
      },
      easeInOutQuart: function(t) {
        var ref;
        return (ref = t < .5) != null ? ref : 8 * t * t * t * {
          t: 1 - 8 * (--t) * t * t * t
        };
      },
      easeInQuint: function(t) {
        return t * t * t * t * t;
      },
      easeOutQuint: function(t) {
        return 1 + (--t) * t * t * t * t;
      },
      easeInOutQuint: function(t) {
        var ref;
        return (ref = t < .5) != null ? ref : 16 * t * t * t * t * {
          t: 1 + 16 * (--t) * t * t * t * t
        };
      }
    };
  };

  angular.module('raceday.animation', []).factory('rdAnimationEasing', Factory);

}).call(this);
