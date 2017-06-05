const gulp = require('gulp');
const gutil = require('gulp-util');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const path = require('path');
const del = require('del');
const tslint = require('gulp-tslint');
const webpackDevServer = require('webpack-dev-server');
const commonConfig = require('./commonConfig');
const paths = commonConfig.paths;
const options = commonConfig.options;

function build() {
  gutil.log('Building the dist files . . .');
  return gulp.src(paths.entryTS)
    .pipe(webpackStream(require(paths.webpackConfig), webpack))
    .pipe(gulp.dest(paths.dest));
}

function clean() {
  gutil.log('Cleaning the dist files . . .');
  return del([ paths.dest ]);
}

function copy() {
  gutil.log('Copying index.html file . . .')
  return gulp.src(paths.entryHTML)
    .pipe(gulp.dest(paths.dest));
}

function eventLog(watchers) {
  watchers.forEach((watcher) => {
    watcher.on('change', (file) => {
      gutil.log('File ' + file + ' was changed, running tasks...');
    });
  });
}

function watch() {
  gutil.log('Watching source files for changes . . .');
  const watchSrcTS = gulp.watch(paths.srcTS, build);
  const watchEntryHTML = gulp.watch(paths.entryHTML, copy);
  eventLog([ watchSrcTS, watchEntryHTML ]);
}

function server() {
  gutil.log('Starting up the dev server . . .');
  new webpackDevServer(webpack(require(paths.webpackConfig)), {
    inline: true,
    contentBase: 'dist',
    port: options.port
  })
    .listen(options.port, 'localhost', (error) => {
      if(error) throw new gutil.PluginError('webpack-dev-server', error);
      // Server listening
      gutil.log('[webpack-dev-server]', 'http://localhost:' + options.port);
    });
}

function lint() {
  gutil.log('Linting typescript files . . .');
  return gulp.src(paths.srcTS)
    .pipe(tslint({
      formatter: 'stylish'
    }))
    .pipe(tslint.report())
}

gulp.task('default', gulp.series(clean, gulp.parallel(build, copy), gulp.parallel(server, watch)));
gulp.task('lint', lint);
// TODO: add actual tests to this task
gulp.task('test', gulp.series(lint));
