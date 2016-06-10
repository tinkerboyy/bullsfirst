'use strict';

var gulp = require('gulp')
    , jshint = require('gulp-jshint')
    , jscs = require('gulp-jscs')
    , util = require('gulp-util')
    , gulpPrint = require('gulp-print')
    , gulpIf = require('gulp-if')
    , args = require('yargs').argv
    , config = require('./gulp.config')()
    , sass = require('gulp-sass')
    , autoprefixer = require('gulp-autoprefixer')
    , del = require('del')
    , plumber = require('gulp-plumber')
    , wiredep = require('wiredep').stream
    , nodemon = require('gulp-nodemon')
    , gulpInject = require('gulp-inject');

var port = process.env.PORT || config.defaultPort;


gulp.task('test', function() {
  console.log('Hello world');
});

gulp.task('test', function() {
    log('Analyzing source with JSHint and JSCS');
    return  gulp
        .src(config.allJs)
        .pipe(gulpIf(args.verbose, gulpPrint()))
        .pipe(jshint())
        .pipe(jscs())
        .pipe(jshint.reporter('jshint-stylish', { verbose: true }))
        .pipe(jshint.reporter('fail'));
});

gulp.task('styles', ['clean-styles'], function() {
    log('compiling SASS to CSS');
    return gulp
        .src(config.sass)
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(config.temp));
});

gulp.task('clean-styles', function(done) {
   var files = config.temp + '**/*.css';
    clean(files, done)
});

gulp.task('sass-watcher', function() {
    gulp.watch(config.sass, ['styles']);
});

gulp.task('wiredep', function() {
    log('wire up css js and app in to html');
    var options = config.getWiredepOptions();
   return gulp
       .src(config.index)
       .pipe(wiredep(options))
       .pipe(gulpInject(gulp.src(config.js)))
       .pipe(gulp.dest(config.client));
});

gulp.task('inject', ['wiredep', 'styles'], function() {
    var options = config.getWiredepOptions();
    return gulp
        .src(config.index)
        .pipe(gulpInject(gulp.src(config.css)))
        .pipe(gulp.dest(config.client));
});

gulp.task('serve-dev', ['inject'], function() {
    var isDev = true;
    var options = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: [config.server]
    };

    return nodemon(options);

});

function clean(path, done) {
    log('Cleaning... ' + util.colors.blue(path));
    del(path);
    done();
}

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                util.log(util.colors.yellow(msg[item]));
            }
        }
    } else {
        util.log(util.colors.yellow(msg));
    }
}
