# app/assets/javascripts/modules/rd_prompt/prompt_methods.coffee
#= require ./module
#= require_self

'use strict'

## Directive: rdCPromptMethods
##   description: Handles prompt modal
##

Service = ->
  return ->
    _service = {}
    parentActions = {}

    _service.setup = ( options ) ->
      defaults = {
        phrase: 'Continue'
      }

      _methods = ['phrase', 'done']
      _methods.forEach (method) ->
        if parentActions[method] == undefined
          parentActions[method] = options[method] || defaults[method]
        else
          throw "#{ method } is already defined on rdCPromptMethods.parentActions"

      return {
        submitHandler: _service.submitHandler
        addModalContentScope: _service.addModalContentScope
        afterModalLaunch: _service.afterModalLaunch
      }

    _service.addModalContentScope = ( contentScope ) ->
      _service.modalContentScope = contentScope
      _service.modalContentScope.valueMismatch = false
      _service.modalContentScope.phrase = parentActions.phrase
      _service.modalContentScope.userInput = ''

      return _service.modalContentScope

    _service.submitHandler = ->
      # Does the user's input match what we need
      regex = new RegExp("^#{parentActions.phrase }$", 'i')
      if regex.test( _service.modalContentScope.userInput )
        _service.done()
      else
        # trigger the error message
        _service.modalContentScope.valueMismatch = true

    _service.done = ->
      # reset values
      _service.modalContentScope.valueMismatch = false
      _service.modalContentScope.userInput = ''
      # tell the parent that it's done
      parentActions.done()

    _service.afterModalLaunch = ->
      inputs = document.querySelectorAll('[id="prompt-user-input"]')
      input = inputs[inputs.length - 1]
      input.focus()

    return _service

angular.module('raceday.prompt').service 'rdPromptMethods', Service
