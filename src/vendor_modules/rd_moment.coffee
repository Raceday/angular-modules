'use strict'

Service = ($window) ->
  return $window.moment

Service.$inject = ['$window']
angular.module('raceday.vendor.moment', []).service 'moment', Service
