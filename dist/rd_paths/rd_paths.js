(function() {
  var PATHS, root;

  root = 'app/modules';

  PATHS = {
    modules: root,
    metadata: root + "/rd_metadata"
  };

  angular.module('raceday.paths', []).constant('rdPATHS', PATHS);

}).call(this);
