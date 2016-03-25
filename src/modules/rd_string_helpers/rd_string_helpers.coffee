# src/modules/rd_string_helpers/rd_string_helpers.coffee

Factory = ->
  capitalize = (word) ->
    word.charAt(0).toUpperCase() + word.slice(1)

  uncapitalize = (word) ->
    word.charAt(0).toLowerCase() + word.slice(1)

  titleize = (string) ->
    cleanTitle = string.replace(/[ \-_]+/g, ' ');
    words = cleanTitle.replace(/([A-Z])/g, " $&").trim().split(' ')
    capitalizedWords = words.map (word) ->
      capitalize(word)

    capitalizedWords.join(' ')

  pluralize = (count, singular, plural=null) ->
    if count == 1
      singular
    else
      if plural?
        plural
      else
        "#{ singular }s"

  pluralizeWithCount = (count, singular, plural=null) ->
    "#{ count } #{ pluralize(count, singular, plural) }"

  inflect = (count, singular, plural) ->
    plural = singular unless plural?
    pluralize(count, singular, plural)

  # Converts CamelCase to snake_case
  ## FooBar => foo_bar
  ## fooBar => foo_bar
  underscore = (string) ->
    newString = string.replace /([A-Z])/g, ($1) ->
      "_#{ $1.toLowerCase() }"
    newString.replace(/^_/, '').replace(/-/g, '_')

  return {
    capitalize:   capitalize
    uncapitalize: uncapitalize
    titleize:     titleize
    pluralize:    pluralize
    pluralizeWithCount: pluralizeWithCount
    underscore:  underscore
    inflect:      inflect
  }

angular.module('raceday.stringHelpers', []).factory 'rdStringHelpers', Factory
