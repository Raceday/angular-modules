'use strict'

Factory = () ->
  _store = {}

  get = ( ajaxId ) ->
    return _store[ajaxId]

  start = ( ajaxId ) ->
    return _store[ajaxId] = true

  end = ( ajaxId ) ->
    return _store[ajaxId] = false

  return {
    get: get
    start: start
    end: end
    init: end
  }

angular.module('rdActivity').factory('rdActivityFactory', Factory)
