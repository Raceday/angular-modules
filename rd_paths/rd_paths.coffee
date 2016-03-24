root = 'app/modules'

PATHS = {
  modules: root
  metadata: "#{ root }/rd_metadata"
}

angular.module('rdPaths', []).constant 'rdPATHS', PATHS
