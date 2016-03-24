EVENTS = {
  ajax: {
    init:     'ajax:init'
    complete: 'ajax:complete'
  }
}

angular.module('rdEvents', []).constant 'rdEVENTS', EVENTS
