# src/modules/rd_prompt/confirm_methods.coffee

Service = ->
  return ->
    _service = {}

    _service.setup = (options) ->
      return {
        submitHandler: options.done
        addModalContentScope: _service.addModalContentScope
      }

    _service.addModalContentScope = ( options ) ->
      return options

    return _service

angular.module('raceday.prompt').service 'rdConfirmMethods', Service
