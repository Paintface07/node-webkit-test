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
          'dist/js/myApp.min.js': ['src/**/*.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/bootstrap/dist/js/bootstrap.min.js']
        }
      }
    },
    concat: {
      options: {
        process: function(src, filepath) {
          console.log("Concatenating: " + filepath);
          if(filepath.indexOf('dist/css/compiled/') === 0 || filepath.indexOf('node_modules') === 0 ) {
            return '// Source: ' + filepath + '\n' + src.replace(/\n/g, '');
          } else { return ''; }
        }
      },
      dist: {
        src: ['dist/css/**/*.css', 'node_modules/bootstrap/dist/css/bootstrap.min.css'],
        dest: 'dist/css/styles.min.css'
      }
    },
    jasmine: {
      tests: {
        src: 'src/**/*.js',
        options: {
          specs: 'test/*Spec.js',
          helpers: 'test/*Helper.js',
          vendor: [
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/angular/lib/index.js',
            'node_modules/angular-mocks/angular-mocks.js'
          ]
        }
      }
    }
  });

  grunt.registerTask('default', ['less', 'jshint', 'uglify', 'concat']);
  grunt.registerTask('test', ['jshint']);

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
};
