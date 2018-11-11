"use strict";
var del = require("del");
var gulp = require("gulp");
var plumber = require("gulp-plumber");
var imagemin = require("gulp-imagemin");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var posthtml = require("gulp-posthtml");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var server = require("browser-sync").create();
var rename = require("gulp-rename");

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest("source/img"));
});

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
  .pipe(plumber())
  .pipe(sass())
  .pipe(postcss([
    autoprefixer()
  ]))
  .pipe(gulp.dest("build/css"))
  .pipe(csso())
  .pipe(rename("style.min.css"))
  .pipe(gulp.dest("build/css"))
  .pipe(server.stream());
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
  .pipe(posthtml())
  .pipe(gulp.dest("build"));
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/*.html" , gulp.series("html" , "refresh"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**",
    "source/css/normalize.css"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "html"
));

gulp.task("start", gulp.series("build", "server"));
