'use strict'

Service = ( $location ) ->
  _service = @

  _service.subdomain = $location.host().split('.')[0]

  return _service

Service.$inject = ['$location']
angular.module('rdUrlHelpers', []).factory 'rdUrlHelpers', Service
