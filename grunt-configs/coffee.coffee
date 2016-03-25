module.exports.tasks = {
  coffee: {

    dist: {
      files: [
        {
          cwd: '<%= source.root %>'
          dest: '<%= dist.root %>'
          expand: true
          ext: '.js'
          join: false
          flatten: false
          src: [
            '**/*.coffee'
          ]
        }
      ]
    }
  }
}
