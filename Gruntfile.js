/*global module:false*/
var 
  fs = require('fs'),
  SVGO = require('./node_modules/svgo');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

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
          './js/src/core/*.js',
          './js/src/views/pages/page_00/*.js',
          './js/src/views/pages/page_01/*.js',
          './js/src/views/pages/page_02/*.js',
          './js/src/views/pages/page_03/*.js',
          './js/src/views/pages/page_04/*.js',
          './js/src/views/pages/page_05/*.js',
          './js/src/views/pages/page_06/*.js',
          './js/src/views/pages/page_07/*.js',
          './js/src/views/pages/page_08/*.js',
        ],
        dest: './release/js/all.js'
      },
      share: {
        src: [
          './js/src/core/00_common.js',
          './js/src/views/pages/share/*.js'
        ],
        dest: './release/js/share.js'
      },
      create: {
        src: [
          './js/src/core/00_common.js',
          './js/src/views/pages/create/*.js'
        ],
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
      php: {
        files: [
          {expand: true, src: ['./*.php'], dest: 'release/'}
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
      },
      audio: {
        files: [
          {expand: true, cwd:'sound/', src: ['*.mp3', '*.ogg'], dest: 'release/sound'}
        ]
      },
      api: {
        files: [
          {expand: true, cwd:'api/', src: ['*.php'], dest: 'release/api'}
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
          './js/**/*.js',
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
          './*.html',
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



  //
  // Gruntタスク：Indexページのビルド
  //
  grunt.registerTask('build-index-html', 'description', function () {

      // 書き込み対象を取得
      var html = fs.readFileSync('./index.html', 'utf-8');


      // テンプレートの生成
      // 1つずつ違うscriptタグでテンプレートを作る.
      // そうしないと画像の読み込みを制御しきれない・・・
      var snipet = '';
      var baseDir = './template/pages/';
      var files = fs.readdirSync(baseDir);
      files.forEach(function (file) {
          if (fs.lstatSync(baseDir + file).isDirectory()) {
              var content = fs.readFileSync(baseDir + file + '/index.html', 'utf-8');
              snipet += '<script type="text/template" id="template_'+file+'" class="pageTemplate">' + content + '</script>';
          }
      });
      html = html.replace('{{template}}', snipet);


      // バージョンの指定
      html = html.replace(/{{version}}/g, new Date().getTime());


      // 書き込み
      fs.writeFileSync('./release/index.html', html, 'utf-8');

  });



  //
  // Gruntタスク：SVGの圧縮
  // ** 対象ディレクトリは、「release/img」以下を対象とします. 
  //
  grunt.registerTask('optim-svg', 'description for optim-svg', function () {

      var 
          done = this.async(),
          execCount = 0,
          svgo = new SVGO();

      var optim = function (dirOrFile, baseDir) {
          var filePath = baseDir + dirOrFile;
          console.log('[optim]', filePath);
          execCount++;

          // ディレクトリの場合には、回帰処理
          console.log('[dir test]', filePath);
          if (fs.lstatSync(baseDir + dirOrFile).isDirectory()) {
              var dirsOrFiles = fs.readdirSync(filePath);
              dirsOrFiles.forEach(function (f) {
                optim(f, filePath + '/');
              });
              execCount--;
              if (execCount === 0) {
                done();
              }
              return;
          }

          // 拡張子チェック
          if (filePath.toLowerCase().lastIndexOf('.svg') !== filePath.length - 4) {
              execCount--;
              if (execCount === 0) {
                done();
              }
              return;
          }

          // 最適化の処理
          // svgo filepath
          var data = fs.readFileSync(filePath, 'utf-8');
          svgo.optimize(data, function (result) {
              console.log('result!!', filePath);

              var svg = result.data;
              fs.writeFileSync(filePath, svg, 'utf-8');

              execCount--;
              if (execCount === 0) {
                  done();
              }
          });


      };

      optim('./release/img', './');
  });




















};
