(function() {
  var Controller, Directive;

  Controller = function() {
    var calculatePaging, ctrl;
    ctrl = this;
    ctrl.limit = 25;
    ctrl.page = 1;
    ctrl.pages = [];
    ctrl.onFirstPage = true;
    ctrl.onLastPage = true;
    ctrl.enablePaging = false;
    ctrl.gotoNextPage = function() {
      ctrl.page += 1;
      return ctrl.gotoPage(ctrl.page);
    };
    ctrl.gotoPreviousPage = function() {
      ctrl.page -= 1;
      return ctrl.gotoPage(ctrl.page);
    };
    ctrl.gotoPage = function(page) {
      var timeout;
      ctrl.page = page;
      ctrl.registrants = [];
      ctrl.totalHitCount = 0;
      ctrl.hitCount = 0;
      if (timeout) {
        $timeout.cancel(timeout);
      }
      return timeout = $timeout(function() {
        return search();
      }, 200);
    };
    calculatePaging = function() {
      var i, numberOfPages, results;
      numberOfPages = Math.ceil(ctrl.totalHitCount / ctrl.limit);
      ctrl.pages = (function() {
        results = [];
        for (var i = 1; 1 <= numberOfPages ? i <= numberOfPages : i >= numberOfPages; 1 <= numberOfPages ? i++ : i--){ results.push(i); }
        return results;
      }).apply(this);
      if (ctrl.page > numberOfPages) {
        ctrl.page = numberOfPages;
      } else if (ctrl.page < 1) {
        ctrl.page = 1;
      }
      ctrl.onLastPage = ctrl.page === numberOfPages;
      ctrl.onFirstPage = ctrl.page === 1;
      ctrl.enablePaging = numberOfPages > 1;
      console.log("Number of Pages: " + numberOfPages);
      console.log("Should enable paging? " + (numberOfPages > 1));
      return console.log("Paging enabled? " + ctrl.enablePaging);
    };
    return null;
  };

  Directive = function() {
    var template;
    template = '<ul class="pagination"> <li class="previous-page" ng-hide="paginationCtrl.onFirstPage"> <a href="#page=previous" ng-click="paginationCtrl.gotoPreviousPage()"> <i class="fa fa-chevron-left"></i> Previous </a> </li> <li class="page" ng-repeat="page in paginationCtrl.pages"> <a href="#page={{ page }}" ng-click="paginationCtrl.gotoPage(page)">{{ page }}</a> </li> <li class="next-page" ng-hide="paginationCtrl.onLastPage"> <a href="#page=next" ng-click="paginationCtrl.gotoNextPage()"> <i class="fa fa-chevron-right"></i> Next </a> </li> </ul>';
    return {
      bindToController: {
        currentPage: "=",
        totalHitCount: "="
      },
      controller: Controller,
      controllerAs: 'paginationCtrl',
      restrict: 'E',
      template: template
    };
    Directive.$inject = [];
    return angular.module('raceday.search').directive('pagination', Directive);
  };

}).call(this);
