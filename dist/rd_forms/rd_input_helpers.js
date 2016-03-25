(function() {
  var Factory;

  Factory = function() {
    var _combineStrings;
    _combineStrings = function(defaultString, string) {
      var _strings;
      _strings = [defaultString];
      if (string) {
        _strings.push(string);
      }
      return _strings.join(' ');
    };
    return {
      combineStrings: _combineStrings
    };
  };

  angular.module('raceday.forms').factory('rdInputHelpers', Factory);

}).call(this);
