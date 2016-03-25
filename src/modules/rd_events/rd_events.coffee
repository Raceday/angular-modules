# src/modules/rd_events/rd_events.coffee

EVENTS = {
  ajax: {
    init:     'ajax:init'
    complete: 'ajax:complete'
  }
}

angular.module('raceday.events', []).constant 'rdEVENTS', EVENTS
