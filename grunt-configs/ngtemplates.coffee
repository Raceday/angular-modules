module.exports.tasks = {
  ngtemplates: {
    options: {
      prefix: '/'
    }
    prompt: {
      options: {
        module: "raceday.prompt"
      }
      cwd: '<%= tmp.root %>'
      expand: true
      ext: '.html.js'
      src: 'rd_prompt/*.html',
      dest: '<%= dist.root %>'
    }
    metadata:{
      options: {
        module: "raceday.metadata"
      }
      cwd: '<%= tmp.root %>'
      expand: true
      ext: '.html.js'
      src: 'rd_metadata/*.html',
      dest: '<%= dist.root %>'
    }
  }
}
