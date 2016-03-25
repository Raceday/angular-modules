# src/modules/rd_forms/rd_model_pub_sub.coffee

Factory = ->
  _klass = ->
    factory = @
    subscribers = []

    factory.subscribe = ( subscriber ) ->
      subscribers.push subscriber

    factory.publish = ( data ) ->
      subscribers.forEach ( subscriber ) ->
        subscriber( data )

    return null

  return _klass

angular.module('raceday.forms').factory 'rdModelPubSub', Factory
