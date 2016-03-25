# src/modules/rd_url_helpers/rd_url_helpers.coffee

Factory = ( $location ) ->

  _subdomain = ->
    $location.host().split('.')[0]

  return {
    subdomain: _subdomain
  }

Service.$inject = ['$location']
angular.module('raceday.urlHelpers', []).factory 'rdUrlHelpers', Factory
