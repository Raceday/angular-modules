'use strict'

Factory = ( $location ) ->

  _subdomain = ->
    $location.host().split('.')[0]

  return {
    subdomain: _subdomain
  }

Service.$inject = ['$location']
angular.module('raceday.urlHelpers', []).factory 'rdUrlHelpers', Factory
