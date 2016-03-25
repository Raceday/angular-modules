# app/assets/javascripts/association/ng_raceday_association/meta_data_controller.coffee
'use strict'

Controller = ($http, $timeout, $document, $window) ->
  ctrl = @
  ctrl.metadatum = $window.gon.metadata || []

  metadataObject = () ->
    {
      key:    ''
      value:  ''
    }

  keyFormatPattern = /[\s\-]/g

  ctrl.noMetadata = ->
    ctrl.metadatum.length == 0

  ctrl.showMetadata = ->
    ctrl.metadatum.length > 0

  ctrl.formatKey = (metadata, $event) ->
    originalValue = metadata.key

    newValue = originalValue.toLowerCase()
    newValue = newValue.replace(keyFormatPattern, "_")

    metadata.key = newValue


  # Evaluate that the key has length, and is unique. If so, we will create a new
  # entry.
  #
  ctrl.addMetadata = ($event) ->
    console.log 'hi'
    $event.preventDefault()
    addMetadata(new metadataObject())

  ctrl.removeMetadata = (metadata, $event) ->
    $event.preventDefault()

    updated = ctrl.metadatum.filter (el) ->
      return el.key != metadata.key

    ctrl.metadatum = updated

  # private methods ---------------------------------------

  addMetadata = (metadata) ->
    ctrl.metadatum.push metadata

Controller.$inject = ['$http', '$timeout', '$document', '$window']

templateUrl = "/rd_metadata/rd_metadata.html"

angular.module('raceday.metadata').component "metadata", {
  controller: Controller
  templateUrl: templateUrl
}
