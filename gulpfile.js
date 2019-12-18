

var gulp = require("gulp");
var sass = require('gulp-sass');
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var del = require("del");
var rename = require("gulp-rename");
var csso = require("gulp-csso");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var svgstore = require("gulp-svgstore");
var webp = require("gulp-webp");
var imagemin = require("gulp-imagemin");
var imageminSvgo = require("imagemin-svgo");
var sequence = require("run-sequence");

var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

var uglify = require('gulp-uglify'),
   // sourcemaps = require('gulp-sourcemaps'),
//    watch = require('gulp-watch'),
	pngquant = require('imagemin-pngquant'),
    rigger = require('gulp-rigger');
 
var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: { //Пути откуда брать исходники
        html: '*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'js/main.js',//В стилях и скриптах нам понадобятся только main файлы
        style: 'scss/style.scss',
        img: 'img/**/*.{png,jpg,svg}', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'fonts/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: '**/*.html',
        js: 'js/**/*.js',
        style: 'scss/**/*.scss',
        img: 'img/**/*.*',
        fonts: 'fonts/**/*.*'
    },
    clean: './build'
};

gulp.task("images", function(){
	return gulp.src("img/**/*.{png,jpg,svg}")
	.pipe(imagemin([
		imagemin.optipng({optimizationLevel: 3}),
		imagemin.jpegtran({progressive: true}),
		imagemin.svgo()
		]))
	.pipe(gulp.dest("img/optimized"));
});



gulp.task("webp", function(){
	 gulp.src("img/**/*.{png,jpg}")
	.pipe(webp({quality: 90}))
	.pipe(gulp.dest("img"));
});

gulp.task("svg", function(){
	gulp.src("img/*.svg")
	.pipe(svgstore({
		inlineSvg: true
	}))
	.pipe(rename("sprite.svg"))
	.pipe(gulp.dest("img"));
});


gulp.task("style", function(){
	return gulp.src(path.src.style)
		.pipe(plumber())
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss([autoprefixer({grid: true})]))
		.pipe(csso())
		.pipe(gulp.dest("css"))
		.pipe(reload({stream: true}));
});
//build
gulp.task('style:build', function () {
    gulp.src(path.src.style) //Выберем наш style.less
        .pipe(plumber())
		.pipe(less())
		.pipe(postcss([autoprefixer({grid: true})]))
		.pipe(csso())
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(reload({stream: true}));
});
gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});
gulp.task('js:build', function () {
	gulp.src(path.src.js) //Найдем наш main файл
		.pipe(plumber())
        .pipe(rigger()) //Прогоним через rigger
        //.pipe(sourcemaps.init()) //Инициализируем sourcemap
        .pipe(uglify()) //Сожмем наш js
        //.pipe(sourcemaps.write()) //Пропишем карты
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
});
gulp.task('image:build', function () {
    return gulp.src("path.src.img") //Выберем наши картинки
	.pipe(imagemin([
		imagemin.optipng({optimizationLevel: 3}),
		imagemin.jpegtran({progressive: true}),
		imagemin.svgo()
		]))
    .pipe(gulp.dest(path.build.img)); //И бросим в build
        
});
gulp.task("webp:build", function(){
	gulp.src(path.src.img)
   .pipe(webp({quality: 90}))
   .pipe(gulp.dest(path.build.img));
});
gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});
gulp.task('watch', function(){
	browserSync.init({
		server: ".",
		notify: false,
		open: true,
		cors: true,
		ui: false
	});
	gulp.watch([path.watch.html], ["html:build"]);
	gulp.watch([path.watch.style], ["style:build"]);
	gulp.watch([path.watch.js], ["js:build"]);
	});
gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
	'image:build',
	'webp:build'
]);

gulp.task("serve", ["style"], function(){
	browserSync.init({
		server: ".",
		notify: false,
		open: true,
		cors: true,
		ui: false
	});
	gulp.watch(path.watch.style, ["style"]);

	gulp.watch(path.watch.html).on("change", reload);
});

gulp.task('default', ['serve']);
