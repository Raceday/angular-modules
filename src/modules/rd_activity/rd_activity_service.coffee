# src/modules/rd_activity/rd_activity_service.coffee

Service = ( rdActivityFactory, rdEVENTS, $rootScope ) ->
  _service = @

  ActivityIndicator = ( id ) ->
    @id = id
    @start = ->
      _service.start( id )
    @stop = ->
      _service.end( id )
    @isActive = ->
      _service.isActive( id )

    return @

  _service.init = ( ajaxId ) ->
    _ajaxId = ajaxId || (Math.random() * (100000 - 10000) + 10000).toString()
    rdActivityFactory.init( _ajaxId )
    return new ActivityIndicator( _ajaxId )

  _service.start = ( ajaxId ) ->
    rdActivityFactory.start( ajaxId )
    _broadcast( rdEVENTS.ajax.init, ajaxId )

  _service.isActive = ( ajaxId ) ->
    rdActivityFactory.get( ajaxId )

  _service.end = ( ajaxId ) ->
    rdActivityFactory.end( ajaxId )
    _broadcast( rdEVENTS.ajax.complete, ajaxId )

  # PRIVATE #############################################################

  _broadcast = ( eventName, ajaxId ) ->
    $rootScope.$broadcast eventName, { id: ajaxId  }

  return _service

Service.$inject = ['rdActivityFactory', 'rdEVENTS', '$rootScope']

angular.module('raceday.activity').service 'rdActivityService', Service
