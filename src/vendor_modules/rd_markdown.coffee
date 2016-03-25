'use strict'

Service = ($window) ->
  service = @

  service.markdown = $window.markdown

Service.$inject = ['$window']
angular.module('raceday.vendor.markdown', []).service 'markdown', Service
