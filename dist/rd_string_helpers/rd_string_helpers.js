(function() {
  'use strict';
  var Service;

  Service = function() {
    var capitalize, inflect, pluralize, pluralizeWithCount, titleize, uncapitalize, underscore;
    capitalize = function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    };
    uncapitalize = function(word) {
      return word.charAt(0).toLowerCase() + word.slice(1);
    };
    titleize = function(string) {
      var capitalizedWords, cleanTitle, words;
      cleanTitle = string.replace(/[ \-_]+/g, ' ');
      words = cleanTitle.replace(/([A-Z])/g, " $&").trim().split(' ');
      capitalizedWords = words.map(function(word) {
        return capitalize(word);
      });
      return capitalizedWords.join(' ');
    };
    pluralize = function(count, singular, plural) {
      if (plural == null) {
        plural = null;
      }
      if (count === 1) {
        return singular;
      } else {
        if (plural != null) {
          return plural;
        } else {
          return singular + "s";
        }
      }
    };
    pluralizeWithCount = function(count, singular, plural) {
      if (plural == null) {
        plural = null;
      }
      return count + " " + (pluralize(count, singular, plural));
    };
    inflect = function(count, singular, plural) {
      if (plural == null) {
        plural = singular;
      }
      return pluralize(count, singular, plural);
    };
    underscore = function(string) {
      var newString;
      newString = string.replace(/([A-Z])/g, function($1) {
        return "_" + ($1.toLowerCase());
      });
      return newString.replace(/^_/, '').replace(/-/g, '_');
    };
    return {
      capitalize: capitalize,
      uncapitalize: uncapitalize,
      titleize: titleize,
      pluralize: pluralize,
      pluralizeWithCount: pluralizeWithCount,
      underscore: underscore,
      inflect: inflect
    };
  };

  angular.module('raceday.stringHelpers', []).service('rdStringHelpers', Service);

}).call(this);
