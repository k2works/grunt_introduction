module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dirs: {
      src: 'src',
      dist: 'dist',
    },
    jshint: {
      beforeconcat: ['<%= dirs.src %>/js/*.js'],
      afterconcat: ['<%= dirs.dest %>/js/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
}
