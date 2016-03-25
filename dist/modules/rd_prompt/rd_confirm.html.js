angular.module('raceday.prompt').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/modules/rd_prompt/rd_confirm.html',
    "<div class=\"modal-header\">\n" +
    "  <a class=\"close-button\"></a>\n" +
    "  <h4>\n" +
    "    {{ confirmTitle }}\n" +
    "  </h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <p ng-bind-html=\"locals.contentSafe\" ng-if=\"locals.contentSafe\"></p>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button autofocus=\"\" class=\"btn primary\" ng-click=\"locals.callback()\">Yes, I'm sure</button><a class=\"btn btn-link\">Cancel</a>\n" +
    "</div>\n"
  );

}]);
