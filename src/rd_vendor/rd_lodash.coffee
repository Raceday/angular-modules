'use strict'

Service = ($window) ->
  service = @

  service._ = $window._

Service.$inject = ['$window']
angular.module('lodash', []).service '_', Service
