module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ['dist'],

    // Compile Pug
    // ----------------------

    pug: {
      email: {
        options: {
          pretty: true,
          data: {
            timestamp: "<%= new Date().getTime() %>"
          }
        },
        files: [{
          expand: true,           // Enable dynamic expansion.
          cwd: 'src/pug',        // Src matches are relative to this path.
          src: ['*.pug'],        // Actual pattern(s) to match.
          dest: 'dist/html/',     // Destination path prefix.
          ext: '.html',           // Dest filepaths will have this extension.
        }]
      }
    },

    // Compile Sass
    // ----------------------

    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: [{
          expand: true,           // Enable dynamic expansion.
          cwd: 'src/scss',        // Src matches are relative to this path.
          src: ['*.scss'],        // Actual pattern(s) to match.
          dest: 'dist/css/',     // Destination path prefix.
          ext: '.css',           // Dest filepaths will have this extension.
        }]
      }
    },

    // Email Builder
    // ----------------------

    emailBuilder: {
      test :{
        files: [{
          expand: true,           // Enable dynamic expansion.
          cwd: 'dist/html',        // Src matches are relative to this path.
          src: ['*.html'],        // Actual pattern(s) to match.
          dest: 'dist/email/',     // Destination path prefix.
          ext: '.html',           // Dest filepaths will have this extension.
        }]
      }
    },

    // Start a server
    // ----------------------

    connect: {
      server: {
        options: {
          open: true,
          port: 9001,
          livereload: true,
          base: 'dist/email'
        }
      }
    },

    // Watch task
    // ----------------------

    watch: {
      options: {
        livereload: true
      },
      pug: {
        files: 'src/pug/**/*.pug',
        tasks: ['pug', 'emailBuilder']
      },
      sass: {
        files: 'src/scss/**/*.scss',
        tasks: ['sass', 'emailBuilder']
      },
      grunt: {
        files: ['Gruntfile.js']
      }
    }

  });

  // Load the plugin that provides the "uglify" task.
  require('load-grunt-tasks')(grunt);

  // Default task(s).
  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['clean', 'pug', 'sass', 'emailBuilder', 'connect', 'watch']);

  // Test build
  grunt.registerTask('test', ['clean', 'pug', 'sass', 'emailBuilder']);
};
