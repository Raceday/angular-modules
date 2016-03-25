# src/modules/rd_forms/rd_input_helpers.coffee

Factory = () ->
  _combineStrings = (defaultString, string) ->
    _strings = [defaultString]
    if string
      _strings.push string

    _strings.join(' ')

  return {
    combineStrings: _combineStrings
  }

angular.module('raceday.forms').factory 'rdInputHelpers', Factory
