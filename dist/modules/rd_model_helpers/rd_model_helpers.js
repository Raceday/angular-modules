(function() {
  'use strict';
  var Factory,
    hasProp = {}.hasOwnProperty;

  Factory = function(_) {
    var _factory;
    _factory = this;
    _factory.populateModelFromObject = function(model, object) {
      var key, results, value;
      results = [];
      for (key in object) {
        if (!hasProp.call(object, key)) continue;
        value = object[key];
        results.push(model[key] = value);
      }
      return results;
    };
    _factory.clearObjectKeys = function(object) {
      var key, results, value;
      results = [];
      for (key in object) {
        if (!hasProp.call(object, key)) continue;
        value = object[key];
        results.push(delete object[key]);
      }
      return results;
    };
    _factory.clearDiffKeys = function(oldObject, newObject) {
      var key, keyDefined, results, value;
      results = [];
      for (key in oldObject) {
        if (!hasProp.call(oldObject, key)) continue;
        value = oldObject[key];
        keyDefined = typeof newObject[key] !== 'undefined';
        if (!keyDefined) {
          results.push(delete oldObject[key]);
        } else {
          results.push(void 0);
        }
      }
      return results;
    };
    _factory.populateModelFromArray = function(modelArray, array) {
      while (modelArray.size > 0) {
        modelArray.pop();
      }
      return array.forEach(function(item) {
        return modelArray.push(item);
      });
    };
    return _factory;
  };

  Factory.$inject = ['_'];

  angular.module('raceday.modelHelpers', ['raceday.vendor.lodash']).factory('rdModelHelpers', Factory);

}).call(this);
