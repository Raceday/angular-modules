(function() {
  var Directive;

  Directive = function(_, $uibModal, $window, $sce, $parse, rdConfirmMethods, rdPromptMethods, rdStringHelpers, $timeout) {
    var link;
    link = function(scope, element, attrs) {
      var _service, addListener, callback, disabled, done, event, goToUrl, killListener, launchModal, listenerCallback, methods, modal, modalScope, removeListener, service, type, url, urlMethod;
      callback = $parse(attrs.rdCpCallback);
      disabled = $parse(attrs.rdCpDisableIf);
      event = (attrs.rdCpEvent || 'click').toLowerCase();
      killListener = (attrs.rdCpKillListener || 'false').toLowerCase() === 'true';
      modal = null;
      type = attrs.rdCpType || 'confirm';
      url = attrs.rdCpUrl;
      urlMethod = attrs.rdCpUrlMethod;
      _service = eval("rd" + (rdStringHelpers.titleize(type)) + "Methods");
      service = _service();
      done = function() {
        if (killListener) {
          removeListener();
        }
        if (modal) {
          modal.close();
        }
        if (url != null) {
          return goToUrl();
        } else {
          if (callback === angular.noop) {
            return element[0][event]();
          } else {
            return callback(scope);
          }
        }
      };
      methods = service.setup({
        done: done,
        phrase: attrs.rdCpPhrase
      });
      modalScope = {
        buttonText: attrs.rdCpButtonText || 'Continue',
        contentSafe: $sce.trustAsHtml(attrs.rdCpContent),
        submitHandler: methods.submitHandler,
        title: attrs.rdCpTitle || 'Are you sure?',
        type: type
      };
      launchModal = function() {
        var _modalScope, modalConfig;
        _modalScope = methods.addModalContentScope(_.clone(modalScope));
        scope.locals = _modalScope;
        modalConfig = {
          scope: scope,
          templateUrl: "/rd_prompt/confirm_prompt_directive.html"
        };
        modal = $uibModal.open(modalConfig);
        if (methods.afterModalLaunch !== void 0) {
          return $timeout(methods.afterModalLaunch, 100);
        }
      };
      goToUrl = function() {
        var csrfParam, csrfToken, csrfTokenMetaTag, form, metadataInput;
        if (!urlMethod) {
          return $window.location = url;
        } else {
          if ((csrfTokenMetaTag = document.querySelector('meta[name=csrf-token]'))) {
            csrfToken = angular.element(csrfTokenMetaTag).attr('content');
            csrfParam = angular.element(document.querySelector('meta[name=csrf-param]')).attr('content');
          }
          form = angular.element("<form method=\"post\" action=\"" + url + "\" style=\"display: none;\"></form>");
          metadataInput = "<input name=\"_method\" value=\"" + urlMethod + "\" type=\"hidden\" />";
          if (csrfParam !== void 0 && csrfToken !== void 0) {
            metadataInput += "<input name=\"" + csrfParam + "\" value=\"" + csrfToken + "\" type=\"hidden\" />";
          }
          angular.element(document.querySelector('body')).append(form.append(metadataInput));
          return form[0].submit();
        }
      };
      listenerCallback = function(e) {
        if (disabled(scope)) {
          return $timeout(done);
        }
        e.preventDefault();
        return launchModal();
      };
      addListener = function() {
        return element.bind(event, listenerCallback);
      };
      removeListener = function() {
        return element.unbind(event, listenerCallback);
      };
      return addListener();
    };
    return {
      restrict: 'A',
      link: link
    };
  };

  angular.module('raceday.prompt').directive('rdConfirmPrompt', Directive);

  Directive.$inject = ['_', '$uibModal', '$window', '$sce', '$parse', 'rdConfirmMethods', 'rdPromptMethods', 'rdStringHelpers', '$timeout'];

}).call(this);
