'use strict'

Service = ( _ ) ->
  _service = @

  _service.populateModelFromObject = (model, object) ->
    for own key, value of object
      model[key] = value

  _service.clearObjectKeys = (object) ->
    for own key, value of object
      delete object[key]

  _service.clearDiffKeys = ( oldObject, newObject ) ->
    for own key, value of oldObject
      keyDefined = typeof(newObject[key]) != 'undefined'
      unless keyDefined
        delete oldObject[key]

  _service.populateModelFromArray = (modelArray, array) ->
    modelArray.pop() while modelArray.size > 0

    array.forEach ( item ) ->
      modelArray.push item

  return _service

Service.$inject = ['_']
angular.module('rdModelHelpers', ['lodash']).factory 'rdModelHelpers', Service
