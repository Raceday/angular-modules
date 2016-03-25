(function() {
  'use strict';
  var Factory,
    hasProp = {}.hasOwnProperty;

  Factory = function(rdStringHelpers, _) {
    var objectKeysToCamelCase, objectKeysToSnakeCase;
    objectKeysToCamelCase = function(object) {
      var key, newKey, newObj, value;
      newObj = null;
      if (_.isArray(object)) {
        newObj = object.map(function(item) {
          return objectKeysToCamelCase(item);
        });
      } else if (_.isObject(object)) {
        newObj = {};
        for (key in object) {
          if (!hasProp.call(object, key)) continue;
          value = object[key];
          newKey = rdStringHelpers.uncapitalize(rdStringHelpers.titleize(key).replace(/\s+/g, ''));
          newObj[newKey] = objectKeysToCamelCase(value);
        }
      } else {
        newObj = object;
      }
      return newObj;
    };
    objectKeysToSnakeCase = function(object) {
      var newObj;
      newObj = null;
      if (_.isArray(object)) {
        newObj = object.map(function(item) {
          return objectKeysToSnakeCase(item);
        });
      } else if (_.isObject(object)) {
        newObj = {};
        _.forEach(object, function(value, key) {
          var newKey;
          newKey = rdStringHelpers.underscore(key).replace(/\s+/g, '');
          return newObj[newKey] = objectKeysToSnakeCase(value);
        });
      } else {
        newObj = object;
      }
      return newObj;
    };
    return {
      objectKeysToCamelCase: objectKeysToCamelCase,
      objectKeysToSnakeCase: objectKeysToSnakeCase
    };
  };

  Factory.$inject = ['rdStringHelpers', '_'];

  angular.module('raceday.jsonHelpers', ['raceday.stringHelpers', 'raceday.vendor.lodash']).factory('rdJsonHelpers', Factory);

}).call(this);
