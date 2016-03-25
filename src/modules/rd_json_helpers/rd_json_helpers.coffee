# src/modules/rd_json_helpers/rd_json_helpers.coffee

Factory = (rdStringHelpers, _) ->

  objectKeysToCamelCase = (object) ->
    newObj = null

    if _.isArray(object)
      newObj = object.map (item) ->
        objectKeysToCamelCase item

    else if _.isObject(object)
      newObj = {}
      for own key, value of object
        newKey = rdStringHelpers.uncapitalize(rdStringHelpers.titleize(key).replace(/\s+/g,''))
        newObj[newKey] = objectKeysToCamelCase(value)

    else
      newObj = object

    return newObj

  objectKeysToSnakeCase = (object) ->
    newObj = null

    if _.isArray(object)
      newObj = object.map (item) ->
        objectKeysToSnakeCase item

    else if _.isObject(object)
      newObj = {}
      _.forEach object, (value, key) ->
        newKey = rdStringHelpers.underscore(key).replace(/\s+/g,'')
        newObj[newKey] = objectKeysToSnakeCase(value)

    else
      newObj = object

    return newObj

  return {
    objectKeysToCamelCase: objectKeysToCamelCase,
    objectKeysToSnakeCase: objectKeysToSnakeCase
  }

Factory.$inject = ['rdStringHelpers', '_']
angular.module('raceday.jsonHelpers', ['raceday.stringHelpers', 'raceday.vendor.lodash']).factory 'rdJsonHelpers', Factory
