# src/modules/rd_prompt/confirm_prompt_directive.coffee

## Directive: rdConfirmPrompt
##   description: Fires a modal that will confirm the user's intention
##
## Global Options:
##   rdCpType
##     type:        string
##     description: The type of alert displayed
##     default:      'confirm'
##     example:     <a class="button" rd-confirm-prompt rd-cp-type="prompt">Delete</a>
##
##   rdCpCallback
##     type:        expression
##     description: The expression to execute on user's agreement
##     default:     angular.noop
##     example:     <a class="button" rd-confirm-prompt rd-cp-callback="remove()">Delete</a>
##
##   rdCpUrl
##     type:        string
##     description: URL to redirect to on success
##     default:     null
##     example:     <a class="button" rd-confirm-prompt rd-cp-url="http://getraceday.com">Delete</a>
##
##   rdCpUrlMethod
##     type:        string
##     description: Verb to attach to event. Note, this is only used if you added a rdCpUrl
##     default:     'GET'
##     example:     <a class="button" rd-confirm-prompt rd-cp-url="http://google.com" rd-cp-url-method="delete">Delete</a>
##
##   rdCpTitle
##     type:        string
##     description: Modal title text
##     default:     'Are you sure?'
##     example:     <a class="button" rd-confirm-prompt rd-cp-title="Delete this round?">Delete</a>
##
##   rdCpContent
##     type:        string
##     description: Modal content
##     default:     null
##     example:     <a class="button" rd-confirm-prompt rd-cp-content="Doing this will be bad">Delete</a>
##
##   rdCpButtonText
##     type:        string
##     description: Modal submit button text
##     default:     'Continue'
##     example:     <a class="button" rd-confirm-prompt rd-cp-button-text="Destroy This!">Delete</a>
##
##   rdCpEvent
##     type:        string
##     description: Event to listen for to launch the modal
##     default:     'click'
##     example:     <form rd-confirm-prompt rd-cp-event="submit">...</form>
##
##   rdCpKillListener
##     type:        boolean
##     description: Should the event listener be killed upon accepting the modal
##     default:     false
##     example:     <form rd-confirm-prompt rd-cp-event-kill="true">...</form>
##
##   rdCpDisableIf
##     type:        boolean
##     description: Disable modal if criteria is met
##     default:     null
##     example:     <form rd-confirm-prompt rd-cp-disable-if="true">...</form>
##
## Confirm Only Options:
##
##   rdCpPhrase
##     type:        string
##     description: Modal confirmation phrase the user must enter
##     default:     'Continue'
##     example:     <a class="button" rd-confirm-prompt rd-cp-phrase="I Agree">Delete</a>
##

Directive = (_, $uibModal, $window, $sce, $parse, rdConfirmMethods, rdPromptMethods, rdStringHelpers, $timeout) ->
  link = (scope, element, attrs) ->
    callback     = $parse( attrs.rdCpCallback )
    disabled     = $parse( attrs.rdCpDisableIf )
    event        = (attrs.rdCpEvent || 'click').toLowerCase()
    killListener = ((attrs.rdCpKillListener || 'false').toLowerCase() == 'true')
    modal        = null
    type         = attrs.rdCpType || 'confirm'
    url          = attrs.rdCpUrl
    urlMethod    = attrs.rdCpUrlMethod

    # get the service based on the type supplied
    # as of setting this directive up, it can be only 'rdPromptMethods' or 'rdConfirmMethods'
    _service = eval("rd#{ rdStringHelpers.titleize(type) }Methods")
    service = _service()

    done = ->
      removeListener() if killListener
      modal.close() if modal

      if url?
        goToUrl()
      else
        # check if a function was supplied
        # callback will either be a supplied expression or angular will set it up
        # as angular.noop
        if callback == angular.noop
          # execute the native event
          element[0][event]()
        else
          # execute supplied callback
          callback( scope )

    # send the service any options it will need to do it's job
    # Each service should return an object
    methods = service.setup({
      done: done
      phrase: attrs.rdCpPhrase
    })

    # vars to send to the modal
    modalScope =
      buttonText:    attrs.rdCpButtonText || 'Continue'
      contentSafe:   $sce.trustAsHtml( attrs.rdCpContent )
      submitHandler: methods.submitHandler
      title:         attrs.rdCpTitle || 'Are you sure?'
      type:          type

    launchModal = ->
      _modalScope = methods.addModalContentScope( _.clone( modalScope ) )
      scope.locals = _modalScope

      modalConfig =
        scope: scope
        templateUrl: "/modules/rd_prompt/confirm_prompt_directive.html"

      # modal = new ModalFactory( modalConfig )
      # modal.activate()
      modal = $uibModal.open( modalConfig )

      if methods.afterModalLaunch != undefined
        $timeout methods.afterModalLaunch, 100

    goToUrl = ->
      if !urlMethod
        $window.location = url
      else
        if ( csrfTokenMetaTag = document.querySelector('meta[name=csrf-token]') )
          csrfToken = angular.element( csrfTokenMetaTag ).attr('content')
          csrfParam = angular.element(document.querySelector('meta[name=csrf-param]')).attr('content')

        form = angular.element("<form method=\"post\" action=\"#{ url }\" style=\"display: none;\"></form>")
        metadataInput = "<input name=\"_method\" value=\"#{ urlMethod }\" type=\"hidden\" />"

        if csrfParam != undefined && csrfToken != undefined
          metadataInput += "<input name=\"#{ csrfParam }\" value=\"#{ csrfToken }\" type=\"hidden\" />"

        angular.element(document.querySelector('body')).append(form.append(metadataInput))
        form[0].submit();

    listenerCallback = (e) ->
      # call through if modal is disabled
      if disabled( scope )
        return $timeout done
      # if enbabled, fire modal
      e.preventDefault()
      launchModal()

    addListener = ->
      element.bind event, listenerCallback

    removeListener = ->
      element.unbind event, listenerCallback

    # Initialize ##############################################################

    addListener()

  return {
    restrict: 'A'
    link: link
  }

angular.module('raceday.prompt').directive 'rdConfirmPrompt', Directive
Directive.$inject = ['_', '$uibModal', '$window', '$sce', '$parse', 'rdConfirmMethods', 'rdPromptMethods', 'rdStringHelpers', '$timeout']
