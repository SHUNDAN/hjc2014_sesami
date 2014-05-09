/*global module:false*/
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
    // concat: {
    //   options: {
    //     banner: '<%= banner %>',
    //     stripBanners: true
    //   },
    //   dist: {
    //     src: ['lib/<%= pkg.name %>.js'],
    //     dest: 'dist/<%= pkg.name %>.js'
    //   }
    // },
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
    // qunit: {
    //   files: ['test/**/*.html']
    // },
    // watch: {
    //   gruntfile: {
    //     files: '<%= jshint.gruntfile.src %>',
    //     tasks: ['jshint:gruntfile']
    //   },
    //   lib_test: {
    //     files: '<%= jshint.lib_test.src %>',
    //     tasks: ['jshint:lib_test', 'qunit']
    //   }
    // }


    watch: {
      // css: {
      //   files: ['./css/scss/**/*.scss'],
      //   tasks: ['compass:css', 'manifest', 'exec:rsync']
      // },
      // js: {
      //   files: ['./js/dev/**/*.js'],
      //   tasks: ['concat:js', 'manifest', 'exec:rsync']
      // },
      // forManifest: {
      //   files: [
      //     './Gruntfile.js',
      //     './*.php',
      //     './js/welcome.js',
      //     './html/*'
      //   ],
      //   tasks: ['manifest', 'exec:rsync']
      // },
      // php: {
      //   files: ['./**/*.php'],
      //   tasks: ['exec:rsync']
      // }


      // 個人用ですみませんが、間借りさせてください
      mune: {
        files: ['./**/*.css', './**/*.js', './**/*.php'],
        tasks: ['exec:sleep2', 'exec:rsync']
      }

    },







    // すみません、宗定個人用ですが、ここに間借りさせてください.
    exec: {
      rsync: {
        command: 'rsync -r -p -v ./ ../yoheim_net/app/sesami-book/'
      },
      sleep2: {
        command: 'sleep 2'
      }
    }




  });

  // These plugins provide necessary tasks.
  // grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-qunit');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');

  // Default task.
  // grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

};
