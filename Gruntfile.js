module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    assemble: {
      options: {
        flatten: true,
        assets: 'dist/assets',
        partials: ['templates/includes/*.hbs'],
        layout: 'templates/layouts/default.hbs',
        data: ['templates/data/*.{json,yml}']
      },
      pages: {
        src: 'templates/pages/*.hbs',
        dest: './'
      }
    },
    useminPrepare: {
      html: './index.html',
      options: {
        dest: './'
      }
    },
    usemin: {
      html: './index.html',
    }
  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.registerTask('default', ['assemble']);
  grunt.registerTask('prod', ['assemble', 'useminPrepare', 'usemin', 'concat', 'uglify', 'cssmin']);
};
