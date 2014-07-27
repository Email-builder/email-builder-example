module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Compile Jade
    // ----------------------

    jade: {
      email: {
        options: {
          pretty: true,
          data: {
            timestamp: "<%= new Date().getTime() %>"
          }
        },
        files: [{
          expand: true,           // Enable dynamic expansion.
          cwd: 'src/jade',        // Src matches are relative to this path.
          src: ['*.jade'],        // Actual pattern(s) to match.
          dest: 'dist/html/',     // Destination path prefix.
          ext: '.html',           // Dest filepaths will have this extension.
        }]
      }
    },

    // Compile Less
    // ----------------------

    less: {
      development: {
        options: {
          paths: ["assets/css"]
        },
        files: [{
          expand: true,           // Enable dynamic expansion.
          cwd: 'src/less',        // Src matches are relative to this path.
          src: ['*.less'],        // Actual pattern(s) to match.
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
      jade: {
        files: 'src/jade/**/*.jade',
        tasks: ['jade', 'emailBuilder']
      },
      less: {
        files: 'src/less/**/*.less',
        tasks: ['less', 'emailBuilder']
      },
      grunt: {
        files: ['Gruntfile.js']
      }
    }

  });

  // Load the plugin that provides the "uglify" task.
  require('load-grunt-tasks')(grunt);

  // Default task(s).
  grunt.registerTask('default', ['jade']);
  grunt.registerTask('build',   ['jade', 'less', 'emailBuilder', 'connect', 'watch']);

};