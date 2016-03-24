# source/app/modules/rd_search/pagination.coffee

Controller = () ->
  ctrl = @

  ctrl.limit = 25
  ctrl.page = 1
  ctrl.pages = []
  ctrl.onFirstPage = true
  ctrl.onLastPage = true
  ctrl.enablePaging = false

  ctrl.gotoNextPage = ->
    ctrl.page += 1
    ctrl.gotoPage(ctrl.page)

  ctrl.gotoPreviousPage = ->
    ctrl.page -= 1
    ctrl.gotoPage(ctrl.page)

  ctrl.gotoPage = (page) ->
    ctrl.page = page
    ctrl.registrants = []
    ctrl.totalHitCount = 0
    ctrl.hitCount = 0
    $timeout.cancel(timeout) if timeout

    timeout = $timeout ->
      search()
    , 200

  calculatePaging = ->
    numberOfPages = Math.ceil(ctrl.totalHitCount / ctrl.limit)
    ctrl.pages = [1..numberOfPages]

    # Protect ourselves from the a page number greater than those available
    # gets somehow passed in.
    #
    # Protect ourselves from a number < 1 getting set for the current page value
    if ctrl.page > numberOfPages
      ctrl.page = numberOfPages
    else if ctrl.page < 1
      ctrl.page = 1

    ctrl.onLastPage   = ctrl.page == numberOfPages
    ctrl.onFirstPage  = ctrl.page == 1
    ctrl.enablePaging = numberOfPages > 1

    console.log "Number of Pages: #{ numberOfPages }"
    console.log "Should enable paging? #{ numberOfPages > 1 }"
    console.log "Paging enabled? #{ ctrl.enablePaging }"

  return null

Directive = () ->

  # Need to find a way to make sure that the pages stop after so many to avoid wrapping
  # should maybe put an ellipse for pages beyond the break point?
  ##
  template = '
    <ul class="pagination">
      <li class="previous-page" ng-hide="paginationCtrl.onFirstPage">
        <a href="#page=previous" ng-click="paginationCtrl.gotoPreviousPage()">
          <i class="fa fa-chevron-left"></i> Previous
        </a>
      </li>

      <li class="page" ng-repeat="page in paginationCtrl.pages">
        <a href="#page={{ page }}" ng-click="paginationCtrl.gotoPage(page)">{{ page }}</a>
      </li>

      <li class="next-page" ng-hide="paginationCtrl.onLastPage">
        <a href="#page=next" ng-click="paginationCtrl.gotoNextPage()">
          <i class="fa fa-chevron-right"></i> Next
        </a>
      </li>
    </ul>
  '

  return {
    bindToController: {
      currentPage: "="
      totalHitCount: "="
    }
    controller: Controller,
    controllerAs: 'paginationCtrl',
    restrict: 'E',
    template: template
  }

  Directive.$inject = []
  angular.module('rdSearch').directive 'pagination', Directive
