(function() {
  var Service;

  Service = function() {
    return function() {
      var _service, parentActions;
      _service = {};
      parentActions = {};
      _service.setup = function(options) {
        var _methods, defaults;
        defaults = {
          phrase: 'Continue'
        };
        _methods = ['phrase', 'done'];
        _methods.forEach(function(method) {
          if (parentActions[method] === void 0) {
            return parentActions[method] = options[method] || defaults[method];
          } else {
            throw method + " is already defined on rdCPromptMethods.parentActions";
          }
        });
        return {
          submitHandler: _service.submitHandler,
          addModalContentScope: _service.addModalContentScope,
          afterModalLaunch: _service.afterModalLaunch
        };
      };
      _service.addModalContentScope = function(contentScope) {
        _service.modalContentScope = contentScope;
        _service.modalContentScope.valueMismatch = false;
        _service.modalContentScope.phrase = parentActions.phrase;
        _service.modalContentScope.userInput = '';
        return _service.modalContentScope;
      };
      _service.submitHandler = function() {
        var regex;
        regex = new RegExp("^" + parentActions.phrase + "$", 'i');
        if (regex.test(_service.modalContentScope.userInput)) {
          return _service.done();
        } else {
          return _service.modalContentScope.valueMismatch = true;
        }
      };
      _service.done = function() {
        _service.modalContentScope.valueMismatch = false;
        _service.modalContentScope.userInput = '';
        return parentActions.done();
      };
      _service.afterModalLaunch = function() {
        var input, inputs;
        inputs = document.querySelectorAll('[id="prompt-user-input"]');
        input = inputs[inputs.length - 1];
        return input.focus();
      };
      return _service;
    };
  };

  angular.module('raceday.prompt').service('rdPromptMethods', Service);

}).call(this);
