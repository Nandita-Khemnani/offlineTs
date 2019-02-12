var gulp = require('gulp');
var browserify = require("browserify");
var babelify = require("babelify");
var uglify = require("gulp-uglifyes");
var buffer = require("vinyl-buffer");
var source = require('vinyl-source-stream');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json', {noImplicitAny: true});
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge2');


gulp.task("bundle", function () {
    return browserify( {
        basedir: '.',
        debug: true,
        entries: ['test/fixture/SampleObserver.js'],
        cache: {},
        packageCache: {}
    })
        .transform(babelify.configure({
            presets: ['es2016'],
            extensions: ['.js', '.ts']
        }))
        .bundle()
        .pipe(source('sample-observer.min.js'))
        .pipe(buffer())
        .pipe(uglify({
            mangle:{
                keep_classnames: true,
                keep_fnames: true,
            }
        }))
        .pipe(gulp.dest("public"));
});