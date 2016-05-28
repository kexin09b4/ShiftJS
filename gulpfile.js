// include gulp, package and modules
const gulp = require('gulp');
const pkg = require('./package.json');
const $ = require('gulp-load-plugins')();

// banners for output files
const banners = {
	max: [
		'/**',
		` * Shift.js Animation Library v${pkg.version}`,
		` * ${pkg.repository.url}`,
		' * ',
		` * Copyright (c) 2015, ${new Date().getFullYear()} ${pkg.author.name}`,
		' * Released under the MIT license',
		` * ${pkg.repository.url}/blob/master/LICENSE`,
		' */',
		'\n'
	].join('\n'),
	min: [
		`/* Shift.js Animation Library v${pkg.version} |`,
		`Copyright (c) 2015, ${new Date().getFullYear()} ${pkg.author.name} |`,
		`${pkg.repository.url}/blob/master/LICENSE */\n`
	].join(' ')
};

// clean output directory
gulp.task('clean', () => {
	return gulp.src('dist', { read: false })
		.pipe($.clean({ force: true }));
});

// concatenate all the things
gulp.task('concat', ['clean'], () => {
	return gulp.src(['src/templates/Intro.js', 'src/Core.js', 'src/modules/*.js', 'src/templates/Outro.js'])
		.pipe($.concat(`shift-v${pkg.version}.js`))
		.pipe($.header(banners.max))
		.pipe(gulp.dest('dist'));
});

// uglify it
gulp.task('uglify', ['concat'], () => {
	return gulp.src(`dist/shift-v${pkg.version}.js`)
		.pipe($.uglify())
		.pipe($.header(banners.min))
		.pipe($.rename(`shift-v${pkg.version}.min.js`))
		.pipe(gulp.dest('dist'));
});

// watch for changes
gulp.task('watch', () => {
	gulp.watch('src/**/*.js', () => {
		gulp.run('build');
	});
});

// build
gulp.task('build', ['clean', 'concat', 'uglify']);