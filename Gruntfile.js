/*global module:false*/
var 
  fs = require('fs'),
  exec = require('child_process').exec,
  util = require('util'),
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
          {expand: true, cwd:'sound/', src: ['*.mp3', '*.ogg', '*.ac3', '*.m4a', 'effect/*.mp3'], dest: 'release/sound'}
        ]
      },
      api: {
        files: [
          {expand: true, cwd:'api/', src: ['*.php'], dest: 'release/api'}
        ]        
      },
      js: {
        files: [
          {expand: true, cwd:'js/libs/zynga-jukebox', src: ['*.js', 'swf/*.as', 'swf/*.swf'], dest: 'release/js/libs/zynga-jukebox'},
          {expand: true, cwd:'js/libs/', src: ['*.js'], dest: 'release/js/libs/'}
        ]
      }
    },

    imagemin: {
        release: {
            files: [{
                expand: true,
                cwd: './release/img',
                src: '**/*.{png,svg}',
                dest: './release/img'
            }]
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

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // Default task.
  grunt.registerTask('default', ['compass', 'concat', 'copy', 'build-index-html']);

  // 画像最適化
  // grunt imagemin

  // PNGフォールバック作成（時間がかかるし、事前にシェルの設定が必要）
  // grunt create-png-from-svg:./release/img/page07


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
  // grunt.registerTask('optim-svg', 'description for optim-svg', function () {

  //     var 
  //         done = this.async(),
  //         execCount = 0,
  //         svgo = new SVGO();

  //     var optim = function (dirOrFile, baseDir) {
  //         var filePath = baseDir + dirOrFile;
  //         console.log('[optim]', filePath);
  //         execCount++;

  //         // ディレクトリの場合には、回帰処理
  //         console.log('[dir test]', filePath);
  //         if (fs.lstatSync(baseDir + dirOrFile).isDirectory()) {
  //             var dirsOrFiles = fs.readdirSync(filePath);
  //             dirsOrFiles.forEach(function (f) {
  //               optim(f, filePath + '/');
  //             });
  //             execCount--;
  //             if (execCount === 0) {
  //               done();
  //             }
  //             return;
  //         }

  //         // 拡張子チェック
  //         if (filePath.toLowerCase().lastIndexOf('.svg') !== filePath.length - 4) {
  //             execCount--;
  //             if (execCount === 0) {
  //               done();
  //             }
  //             return;
  //         }

  //         // 最適化の処理
  //         // svgo filepath
  //         var data = fs.readFileSync(filePath, 'utf-8');
  //         svgo.optimize(data, function (result) {
  //             console.log('result!!', filePath);

  //             var svg = result.data;
  //             fs.writeFileSync(filePath, svg, 'utf-8');

  //             execCount--;
  //             if (execCount === 0) {
  //                 done();
  //             }
  //         });
  //     };

  //     optim('./release/img', './');
  // });



  //
  // Gruntタスク：SVGからPNGを生成するタスク
  // IE8やAndroid用のPNGへのフォールバックを行うために使う画像を生成します
  // ** 対象ディレクトリは、「release/img」以下を対象とします. 
  // ** 事前に、ImageMagic（http://www.imagemagick.org/script/binary-releases.php#macosx）をインストールする必要があります.
  //
  grunt.registerTask('create-png-from-svg', 'description for create-png-from-svg', function () {

      if (arguments.length === 0) {
          console.error('引数に対象ディレクトリを指定してください');
          return false;
      }

      var
          baseDir = arguments[0],
          done = this.async(),
          execCount = 0,
          userRecursive = (arguments[1] === true),
          recursive = true,
          queue = [];


      var createPNGFromSVG = function (dirOrFile, baseDir) {

          var filePath = baseDir + dirOrFile;
          // console.log('[createPNGFromSVG]', filePath);
          execCount++;

          // ディレクトリの場合には、回帰処理
          if (fs.lstatSync(baseDir + dirOrFile).isDirectory() && recursive) {

              if (!userRecursive) {
                  recursive = false;  // 1回だけに限定.
              }

              // console.log('[this is dir]', filePath);
              var dirsOrFiles = fs.readdirSync(filePath);
              dirsOrFiles.forEach(function (f) {
                queue.push([f, filePath + '/'])
              });
              execCount--;
              if (execCount === 0) {
                  if (queue.length > 0) {
                      var target = queue.shift();
                      createPNGFromSVG(target[0], target[1]);
                  } else {
                      done();                    
                  }
              }
              return;
          }

          // 拡張子チェック
          if (filePath.toLowerCase().lastIndexOf('.svg') !== filePath.length - 4) {
              execCount--;
              if (queue.length > 0) {
                  var target = queue.shift();
                  createPNGFromSVG(target[0], target[1]);
              } else {
                  done();                    
              }
              return;
          }

          // 最適化の処理
          // convert -background none btn_page.svg btn_page.png
          var pngPath = filePath.replace('.svg', '.png');
          var command = util.format('convert -background none %s %s', filePath, pngPath);
          console.log(command);
          exec(command, function (err, stdout, stderr) {

              console.log('[result]', err, stdout, stderr);

              execCount--;
              if (execCount === 0) {
                  if (queue.length > 0) {
                      var target = queue.shift();
                      createPNGFromSVG(target[0], target[1]);
                  } else {
                      done();                    
                  }
              }
          });

      };

      createPNGFromSVG(baseDir, './');









  });

























};
