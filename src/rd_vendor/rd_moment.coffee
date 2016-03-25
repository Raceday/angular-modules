'use strict'

Service = ($window) ->
  return $window.moment

Service.$inject = ['$window']
angular.module('moment', []).service 'moment', Service
