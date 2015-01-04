module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dirs: {
      src: 'src',
      dest: 'dest',
    },
    jshint: {
      beforeconcat: ['<%= dirs.src %>/js/*.js'],
      afterconcat: ['<%= dirs.dest %>/js/*.js']
    },
    concat: {
      options: {
        banner: '/*! some copyright information here */',
      },
      js: {
        src: ['<%= dirs.src %>/js/*.js'],
        dest: '<%= dirs.dest %>/js/<%= pkg.name %>.js',
      }      
    },
    uglify: {
      options: {
        banner: '/*! some copyright information here */',
        sourceMap: true
      },
      dest: {
        files: {
          '<%= dirs.dest %>/js/<%= pkg.name %>.min.js':
          '<%= dirs.dest %>/js/<%= pkg.name %>.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('build', 'Build JavaScript Files', [
    'jshint:beforeconcat',
    'concat',
    'jshint:afterconcat',
    'uglify'
  ]);
};
