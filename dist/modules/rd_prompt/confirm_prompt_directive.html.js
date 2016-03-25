angular.module('raceday.prompt').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/modules/rd_prompt/confirm_prompt_directive.html',
    "<div class=\"modal-header\">\n" +
    "  <a class=\"close-button\"></a>\n" +
    "  <h4>\n" +
    "    {{ locals.title }}\n" +
    "  </h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <p ng-bind-html=\"locals.contentSafe\" ng-if=\"locals.contentSafe\"></p>\n" +
    "  <form ng-submit=\"locals.submitHandler()\" novalidate=\"\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label ng-class=\"{field_with_errors: locals.valueMismatch}\" ng-if=\"locals.type == &#39;prompt&#39;\">Type \"{{ locals.phrase }}\" to continue</label><input class=\"form-control\" id=\"prompt-user-input\" ng-model=\"locals.userInput\" type=\"text\" /><span class=\"text-danger\" ng-show=\"locals.valueMismatch\">must match \"{{ locals.phrase }}\"</span>\n" +
    "    </div>\n" +
    "    <div class=\"form-actions\">\n" +
    "      <input class=\"btn btn-danger\" type=\"submit\" value=\"{{ locals.buttonText }}\" /><a class=\"btn btn-link\">Cancel</a>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>\n"
  );

}]);
