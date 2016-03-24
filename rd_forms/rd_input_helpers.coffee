# source/app/modules/rd_input/rd_input_helpers.coffee

Factory = () ->
  _combineStrings = (defaultString, string) ->
    _strings = [defaultString]
    if string
      _strings.push string

    _strings.join(' ')

  return {
    combineStrings: _combineStrings
  }

angular.module('rdForms').factory 'rdInputHelpers', Factory
