'use strict'

Service = ($window) ->
  service = @

  service._ = $window._

Service.$inject = ['$window']
angular.module('raceday.vendor.lodash', []).service '_', Service
