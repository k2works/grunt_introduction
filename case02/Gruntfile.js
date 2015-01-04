module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dirs: {
      src: 'src',
      dest: 'dest',
    },
    coffee: {
      compile: {
        files: {
          '<%= dirs.dest %>/js/<%= pkg.name %>.js':
          '<%= dirs.src %>/coffee/*.coffee'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
};
