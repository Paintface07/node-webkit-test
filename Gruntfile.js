/*global module:false*/
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: '<json:package.json>',
    less: {
      app: {
        options: {
          paths: ['styles/**/*.less']
        },
        files: {
          "dist/css/compiled/stylesheet.css": "styles/stylesheet.less"
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {}
      }
    },
    uglify: {
      options: {},
      dist: {
        files: {
          'dist/js/myApp.min.js': ['src/**/*.js']
        }
      }
    },
    concat: {
      options: {
        process: function(src, filepath) {
          if(filepath.indexOf('dist/css/compiled/') > -1) {
            return '// Source: ' + filepath + '\n' + src.replace(/\n/g, '');
          } else { return '';}
        }
      },
      dist: {
        src: ['dist/css/**/*.css'],
        dest: 'dist/css/styles.min.css'
      }
    }
  });

  grunt.registerTask('default', ['less', 'jshint', 'uglify', 'concat']);

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
};
