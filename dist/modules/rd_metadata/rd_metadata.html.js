angular.module('raceday.metadata').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/modules/rd_metadata/rd_metadata.html',
    "<fieldset>\n" +
    "  <legend>Metadata</legend>\n" +
    "  <div class=\"grid-block medium-12\" ng-if=\"$ctrl.noMetadata()\">\n" +
    "    <div class=\"grid-content medium-6\">\n" +
    "      <p>\n" +
    "        Metadata allows you to define custom data values for this object.\n" +
    "        This can be really useful if there is a field, or specific information\n" +
    "        that isn't currently available to you in Raceday.\n" +
    "      </p>\n" +
    "      <p>\n" +
    "        <a class=\"button large secondary\" ng-click=\"$ctrl.addMetadata( $event )\"><i class=\"fa fa-database\"></i> Add metadata</a>\n" +
    "      </p>\n" +
    "    </div>\n" +
    "    <div class=\"grid-content medium-6\">\n" +
    "      <h6>\n" +
    "        Want to see it in action? (Link Needed)\n" +
    "      </h6>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"grid-block medium-12\" ng-if=\"$ctrl.showMetadata()\">\n" +
    "    <div class=\"grid-block medium-8\">\n" +
    "      <div class=\"grid-block\" ng-repeat=\"metadata in $ctrl.metadatum\">\n" +
    "        <div class=\"grid-content medium-4\">\n" +
    "          <input ng-blur=\"$ctrl.formatKey( metadata, $event )\" ng-model=\"metadata.key\" placeholder=\"Key\" type=\"text\" />\n" +
    "        </div>\n" +
    "        <div class=\"grid-content medium-6\">\n" +
    "          <input name=\"registration_form[metadata][{{ metadata.key }}]\" ng-model=\"metadata.value\" placeholder=\"Value\" type=\"text\" />\n" +
    "        </div>\n" +
    "        <div class=\"grid-content medium-2\">\n" +
    "          <a href=\"#\" ng-click=\"$ctrl.removeMetadata( metadata, $event )\"><i class=\"fa fa-times-circle\"></i></a>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"grid-content medium-12\">\n" +
    "        <a href=\"#add\" ng-click=\"$ctrl.addMetadata( $event )\">Add another field</a>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"grid-block medium-4\">\n" +
    "      <div class=\"grid-content\">\n" +
    "        <p>\n" +
    "          Metadata allows you to define custom data values for this object.\n" +
    "          This can be really useful if there is a field, or specific information\n" +
    "          that isn't currently available to you in Raceday.\n" +
    "        </p>\n" +
    "        <h6>\n" +
    "          Want to see it in action? (Link Needed)\n" +
    "        </h6>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</fieldset>\n"
  );

}]);
