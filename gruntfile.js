'use strict';

module.exports = function(grunt) {

  require('time-grunt')(grunt); //displays elapsed execution time of grunt tasks
  require('load-grunt-tasks')(grunt); //look for plugins in dependencies/devDependencies starting with grunt & loads them

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),


    clean: {
        dev: ['build', 'public']
    },

    concat: { 
        'build/index-app.js': //must be in this specific order if not will fail to find references
        ['client/index/app.js', 
        'client/index/models/*.js', 
        'client/index/views/*.js',
        'client/index/controllers/*.js',
        'client/index/main.js'], 
        
        'build/index-styles.css':'views/index/styles/*.css',
        'build/index-templates.js':'views/index/templates/*.js',
        'build/index-scripts.js':'views/index/scripts/*.js',

        'build/cover-styles.css':'views/cover/styles/*.css',
        'build/cover-templates.js':'views/cover/templates/*.js',
        'build/cover-scripts.js':'views/cover/scripts/*.js',

    },

    copy: { //in dev mode, copy files from build directory to public so our front-end app can see them and our server can server them
        dev: {
            files: [{
                    expand: true,
                    cwd: 'build/',
                    src: '*.js',
                    dest: 'public/js/',
                    flatten: true,
                    filter: 'isFile',
            }, {
                    expand: true,
                    cwd: 'build/',
                    src: '*.css',
                    dest: 'public/css/',
                    flatten: true,
                    filter: 'isFile',
            }]
        }
    },

    // mongod server launcher
    shell: {
        mongo: {
            command: 'mongod',
            options: {
                async: true
            }
        }
    },

    nodemon: {
        dev: {
            script: 'server.js',
            options: {
                nodeArgs: ['--debug'],
                watch: ['controllers', 'views'], // top-level files are auto-watched by nodemon??
                env: {
                    PORT: '2345'
                }
            }
        }
    },

    concurrent: { //execute blocking tasks asynchronously
        dev: {
            tasks: ['nodemon:dev', 'watch:frontend'], //'shell:mongo'] --> manual database for now
            options: {
                logConcurrentOutput: true
            }
        }
    },


    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['lib/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      },
      frontend: {
        src: ['build/**/*.js']
      }
    },

    watch: { //if any of these files change, build again
      frontend: {
        files: ['client/**/*', 'views/**/*'],
        tasks: ['build:dev'],
      }
    },


  });

  grunt.registerTask('init:dev', ['clean']);
  grunt.registerTask('build:dev', ['clean:dev', 'concat', 'copy:dev']);
  grunt.registerTask('server', ['build:dev', 'concurrent:dev']);

};