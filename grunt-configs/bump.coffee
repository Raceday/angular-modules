'use strict'

module.exports.tasks = {
  bump: {
    options: {
      files: ['package.json'],
      updateConfigs: ['pkg'],
      commit: true,
      commitMessage: 'Version bump to %VERSION%',
      commitFiles: ['package.json'],
      createTag: true,
      tagName: 'v%VERSION%',
      tagMessage: 'Version %VERSION%',
      push: false,
      gitDescribeOptions: '',
      globalReplace: false
    }
  }
}
