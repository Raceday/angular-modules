'use strict'

module.exports = (grunt) ->
  path = require('path')

  # Load grunt tasks automatically
  require('load-grunt-tasks')(grunt)

  # App configuration paths & variables
  options = {
    config: {
      src: path.join(process.cwd(), "grunt-configs/*")
    }

    source: {
      root: 'src'
    }

    dist: {
      root: 'dist'
    }

    tmp: {
      root: '.tmp'
    }

    pkg: grunt.file.readJSON('package.json')
  }

  # Load grunt configuration automatically
  configs = require('load-grunt-configs')(grunt, options);

  # Define the configuration for all tasks
  grunt.initConfig configs

  grunt.registerTask 'dist', 'compile', ->
    grunt.task.run [
      'clean:dist'
      'coffee:dist'
      'slim:dist'
      'ngtemplates'
    ]

  grunt.registerTask 'default', ->
    grunt.task.run ['dist']
