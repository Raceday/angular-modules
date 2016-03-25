module.exports.tasks = {
  slim : {
    options : {
      pretty : true
      option: ["attr_list_delims={'(' => ')', '[' => ']'}"]
    }

    dist : {
      files : [
        { # Compile all SLIM templates in the root of /app
          expand  : true
          cwd     : '<%= source.root %>'
          src     : ['**/*.slim']
          dest    : '<%= tmp.root %>'
          ext     : '.html'
        }
      ]
    }
  }
}
