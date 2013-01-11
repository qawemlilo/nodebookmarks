module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-exec');

    grunt.initConfig({
        exec: {
            build: {
                command: 'public/javascripts/r.js -o public/javascripts/app/build.js'
            }
        }
    });
};