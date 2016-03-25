(function() {
  'use strict';
  var Controller, templateUrl;

  Controller = function($http, $timeout, $document, $window) {
    var addMetadata, ctrl, keyFormatPattern, metadataObject;
    ctrl = this;
    ctrl.metadatum = $window.gon.metadata || [];
    metadataObject = function() {
      return {
        key: '',
        value: ''
      };
    };
    keyFormatPattern = /[\s\-]/g;
    ctrl.noMetadata = function() {
      return ctrl.metadatum.length === 0;
    };
    ctrl.showMetadata = function() {
      return ctrl.metadatum.length > 0;
    };
    ctrl.formatKey = function(metadata, $event) {
      var newValue, originalValue;
      originalValue = metadata.key;
      newValue = originalValue.toLowerCase();
      newValue = newValue.replace(keyFormatPattern, "_");
      return metadata.key = newValue;
    };
    ctrl.addMetadata = function($event) {
      console.log('hi');
      $event.preventDefault();
      return addMetadata(new metadataObject());
    };
    ctrl.removeMetadata = function(metadata, $event) {
      var updated;
      $event.preventDefault();
      updated = ctrl.metadatum.filter(function(el) {
        return el.key !== metadata.key;
      });
      return ctrl.metadatum = updated;
    };
    return addMetadata = function(metadata) {
      return ctrl.metadatum.push(metadata);
    };
  };

  Controller.$inject = ['$http', '$timeout', '$document', '$window'];

  templateUrl = function(rdPATHS) {
    return rdPATHS.metadata + "/rd_metadata.html";
  };

  templateUrl.$inject = ['rdPATHS'];

  angular.module('raceday.metadata').component("metadata", {
    controller: Controller,
    templateUrl: templateUrl
  });

}).call(this);
