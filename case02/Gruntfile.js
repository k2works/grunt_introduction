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
    },
    uglify: {
      options: {
        banner: '/*! some copyright information here */',
        sourceMapIn: '<%= dirs.dest %>/js/<%= pkg.name %>.js.map'
      },
      dest: {
        files: {
          '<%= dirs.dest %>/js/<%= pkg.name %>.min.js':
          '<%= dirs.dest %>/js/<%= pkg.name %>.js'
        }
      }
    }    
  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('build','Build CoffeeScript Files',[
    'coffee',
    'uglify',
  ]);
};
