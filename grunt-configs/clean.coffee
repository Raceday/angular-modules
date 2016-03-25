'use strict'

module.exports.tasks = {
  clean: {
    dist: [
      '<%= dist.root %>'
      '<%= tmp.root %>'
    ]
  }
}
