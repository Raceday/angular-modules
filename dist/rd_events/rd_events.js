(function() {
  var EVENTS;

  EVENTS = {
    ajax: {
      init: 'ajax:init',
      complete: 'ajax:complete'
    }
  };

  angular.module('raceday.events', []).constant('rdEVENTS', EVENTS);

}).call(this);
