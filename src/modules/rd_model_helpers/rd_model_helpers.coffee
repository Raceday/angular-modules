'use strict'

Factory = ( _ ) ->
  _factory = @

  _factory.populateModelFromObject = (model, object) ->
    for own key, value of object
      model[key] = value

  _factory.clearObjectKeys = (object) ->
    for own key, value of object
      delete object[key]

  _factory.clearDiffKeys = ( oldObject, newObject ) ->
    for own key, value of oldObject
      keyDefined = typeof(newObject[key]) != 'undefined'
      unless keyDefined
        delete oldObject[key]

  _factory.populateModelFromArray = (modelArray, array) ->
    modelArray.pop() while modelArray.size > 0

    array.forEach ( item ) ->
      modelArray.push item

  return _factory

Factory.$inject = ['_']
angular.module('raceday.modelHelpers', ['raceday.vendor.lodash']).factory 'rdModelHelpers', Factory
