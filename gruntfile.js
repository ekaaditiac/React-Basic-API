
module.exports = function(grunt) {
  // 1. All configuration   goes  here
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      // 2. confoguration for concatinating file goes here
      dist:{
        src:[
          // 'assets/src/js/global/*.js',
          'assets/src/js/component/*.js'
        ],
        dest: 'assets/dist/js/bundle.min.js',
      },
      devmin:{
        options:{
          beautify: true,
          mangle: false,
          compress: false,
          preserveComments: false
        },
        files:{
          'assets/dist/js/bundle.js' : 'assets/src/js/**/*.js',

        }
      },
      dev:{
        options:{
          beautify: true,
          mangle: false,
          compress: false,
          preserveComments: false
        },
        // src:[
        //   'assets/dev/js/components/*.js',
        //   'assets/dev/js/libs/*.js',
        //   'assets/dev/js/global.js'
        // ],
        // dest: 'assets/dist/js/bundle.js',
        files:{
          // output file : entry file
          'assets/dist/js/component/index.js' : 'assets/src/js/component/index.js',
        }
      }
    },

    jshint: {
    options: {
          reporter: require('jshint-stylish')
    },
     all: ['gruntfile.js', 'assets/src/js/**/*.js']
   },
    sass:{
      dev:{
        options:{
           style: 'expanded'
        },
        files: {

          // output file : entry file
          'assets/src/css/main.css' : 'assets/src/sass/main.sass',
          // 'assets/dist/css/main.css' : 'assets/src/sass/main.sass'
        }
      },
      // Not Good for compressed ***
      dist:{
        options:{
           style: 'compressed'
        },
        files: {
          // output file : entry file

          'assets/dist/css/main.css' : 'assets/src/sass/main.sass'
        }
      }
    },

    // Good for compressed ****
    cssmin:{
        options: {
          shorthandCompacting: false,
          roundingPrecision: -1
        },
        target: {
          files: [{
            // output file : entry file
            expand: true,
            cwd: 'assets/src/css/',
            src: ['*.css','!*.min.css'],
            dest: 'assets/src/css/',
            ext: '.min.css'

          }]
        }
    },
    browserSync: {
        dev: {
            bsFiles: {
                src : [
                    'assets/src/css/*.css',
                    '*.html'
                ]
            },
            options: {
                watchTask: true,
                // proxy: 'excelsia.dev',
                server: './',
            }
        }
    },
    watch: {
      js:{
        files: "assets/src/js/**/*.js",
        tasks: ["uglify:dev"]
      },
      css:{
        files: "assets/src/sass/**/*.sass",
        tasks: ["sass:dev"]
      },
      debugger:{
        files: ['gruntfile.js','src/js/**/*.js'],
        tasks: ['jshint']
      }
    }
  });

  // 3. where we tell Grunt we plan  to use  this plugin
  // grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.

  grunt.registerTask('start', ['browserSync','watch']);
  grunt.registerTask('default', ['uglify:dev','sass:dev']);
  grunt.registerTask('build', ['uglify:dist','uglify:devmin','sass:dist']);
};
