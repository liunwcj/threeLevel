'use strict';

var gulp = require('gulp');
var docUtil = require('amazeui-doc-util');
var runSequence = require('run-sequence');
var tasks = require('amazeui-gulp-tasks');

var config = {
  less: {
    src: './src/*.less', // 源文件 
    autoPrefixer: {}, // autoprefixer 设置， 
    dist: './dist', // 部署目录 
    watches: './src/**/*.less', // watch 的文件，如果不设置则 watch `src` 里的文件 
    banner: '' // 是否添加 banner，布尔值或者 {template: '', data: {}} 
  },
  browserify: {
    bundleOptions: {
      entries: './src/amazeui.threelevel.js',
      cache: {},
      packageCache: {}
    },
    filename: 'amazeui.threelevel.js',
    // transforms: [['browserify-shim', {global: true}]],
    plugins: [],
    dist: 'dist'
  },
  md: {
    src: ['README.md','docs/*.md'],
    data: {
      pluginTitle: 'Amaze UI threeLevel',
      pluginDesc: 'jQuery threeLevel 插件 (底部三级分类)',
      buttons: 'liunwcj/threeLevel', // GitHub 项目地址（去除 https://github.com/ 部分） 
      head: '<link rel="stylesheet" href="../amazeui.threelevel.css"/>'
    },
    // gulp-rename 设置 
    rename: function(file) {
      file.basename = file.basename.toLowerCase();
      if (file.basename === 'readme') {
        file.basename = 'index';
      }
      file.extname = '.html';
    },
    dist: function(file) {
      if (file.relative === 'index.html') {
        return 'dist'
      }
      return 'dist/docs';
    }
  },
  browserSync: {
    notify: false,
    server: 'dist',
    logPrefix: 'AMP'
  },
  // watch files and reload browserSync
  bsWatches: 'dist/**/*',
  clean:'dist'
};

// init tasks
tasks(gulp, config);

gulp.task('copy:js', function() {
  return gulp.src('docs/*.js')
    .pipe(gulp.dest('dist/docs'));
});

gulp.task('copy:watch', function() {
  return gulp.watch('docs/*.js', ['copy:js']);
});

gulp.task('copy', ['copy:js', 'copy:watch']);

gulp.task('build', function(cb) {
  return runSequence('clean', ['copy', 'browserify', 'less', 'markdown'], function(){
    gulp.run('server');
  });
});

// bug
gulp.task('dev', ['build', 'server']);

