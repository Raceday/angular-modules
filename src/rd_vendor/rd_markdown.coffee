'use strict'

Service = ($window) ->
  service = @

  service.markdown = $window.markdown

Service.$inject = ['$window']
angular.module('markdown', []).service 'markdown', Service
