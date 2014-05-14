/*global module:false*/
var fs = require('fs');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    // pkg: grunt.file.readJSON('package.json'),
    // banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
    //   '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
    //   '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
    //   '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
    //   ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // // Task configuration.
    // uglify: {
    //   options: {
    //     banner: '<%= banner %>'
    //   },
    //   dist: {
    //     src: '<%= concat.dist.dest %>',
    //     dest: 'dist/<%= pkg.name %>.min.js'
    //   }
    // },
    // jshint: {
    //   options: {
    //     curly: true,
    //     eqeqeq: true,
    //     immed: true,
    //     latedef: true,
    //     newcap: true,
    //     noarg: true,
    //     sub: true,
    //     undef: true,
    //     unused: true,
    //     boss: true,
    //     eqnull: true,
    //     browser: true,
    //     globals: {}
    //   },
    //   gruntfile: {
    //     src: 'Gruntfile.js'
    //   },
    //   lib_test: {
    //     src: ['lib/**/*.js', 'test/**/*.js']
    //   }
    // },

    compass: {
      css: {
        options: {
          sassDir: './css/src',
          cssDir: './release/css',
        }
      }
    },



    concat: {

      // JS
      all: {
        src: [
          // 最小限のものなので、適宜修正をお願いします（宗）
          './js/src/core/*.js',
          './js/src/views/pages/page_00/*.js',
          './js/src/views/pages/page_01/*.js'
        ],
        dest: './release/js/all.js'
      },
      share: {
        src: ['./js/src/views/pages/share/*.js'],
        dest: './release/js/share.js'
      },
      create: {
        src: ['./js/src/views/pages/create/*.js'],
        dest: './release/js/create.js'
      },
      notfound: {
        src: ['./js/src/views/pages/notfound/*.js'],
        dest: './release/js/notfound.js'
      },
      libs: {
        src: ['./js/libs/*.js'],
        dest: './release/js/libs/all-libs.js'
      },

      // HTML
      html: {
        src: ['./template/**/*.html'],
        dest: './release/template.html'
      }

    },



    copy: {
      html: {
        files: [
          {expand: true, src: ['./*.html'], dest: 'release/'}
        ]
      },
      img: {
        files: [
          {expand: true, cwd:'img/', src: ['**/*'], dest: 'release/img'}
        ]
      },
      apache: {
        files: [
          {expand: true, src: ['.htaccess'], dest: 'release/'}
        ]
      }
    },




    watch: {

      compass: {
          files: ['./css/**/*.scss'],
          tasks: ['compass']
      },
      concat: {
        files: [
          './**/*.js',
          './template/**/*.html'
        ],
        tasks: ['concat', 'build-index-html']
      },
      copy: {
        files: [
          './img/**/*.png',
          './img/**/*.jpg',
          './img/**/*.gif',
          './img/**/*.svg',
          './*.php',
          './api/**/*.php',
          '.htaccess'
        ],
        tasks: ['copy', 'build-index-html']
      }
    },

  });

  // These plugins provide necessary tasks.
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');

  // Default task.
  grunt.registerTask('default', ['compass', 'concat', 'copy', 'build-index-html']);



  // tasksディレクトリでの定義ってどうするんでしたっけ？(ムネ)
  grunt.registerTask('build-index-html', 'description', function () {

      var html = fs.readFileSync('./index.html', 'utf-8');
      var template = fs.readFileSync('./release/template.html', 'utf-8');
      html = html.replace('{{template}}', template);

      fs.writeFileSync('./release/index.html', html, 'utf-8');
  });









};
