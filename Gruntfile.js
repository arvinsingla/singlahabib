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
      site: {
        src: 'templates/pages/*.hbs',
        dest: './'
      }
    },
    useminPrepare: {
      html: './index.html',
      options: {
        dest: './dist'
      }
    },
    usemin: {
      html: './index.html',
    },
    compress: {
      main: {
        options: {
          mode: 'gzip'
        },
        files: [
          { src: ['dist/stylesheets/*.css'], dest: 'dist/stylesheets/', ext: '.gz.css'},
          { src: ['dist/js/*.js'], dest: 'dist/js/', ext: '.gz.js'},
        ]
      }
    },
    copy: {
      main: {
        files: [
          { expand: true, src: ['index.html'], dest: 'dist/', filter: 'isFile' },
          { expand: true, src: ['images/*'], dest: 'dist/', filter: 'isFile' },
          { expand: true, src: ['misc/*'], dest: 'dist/',  filter: 'isFile' },
          { expand: true, src: ['fonts/*'], dest: 'dist/stylesheets/',  filter: 'isFile' },
          { expand: true, cwd: 'bower_components/flexslider/', src: ['fonts/**'], dest: 'dist/stylesheets/',  filter: 'isFile' }
        ]
      }
    }
  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.registerTask('default', ['assemble']);
  grunt.registerTask('dev', ['assemble', 'useminPrepare', 'usemin', 'concat', 'uglify', 'cssmin', 'copy']);
  grunt.registerTask('prod', ['assemble', 'useminPrepare', 'usemin', 'concat', 'uglify', 'cssmin', 'copy']);
};
