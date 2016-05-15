module.exports = function(grunt) {

	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),
		
		clean: {
			build: {
				src: ['dist']
			}
		},
		
		concat: {
		    dist: {
			    src: [
				    'src/shift.js', // UPDATE NOMENCLATURE AND DIRECTORIES, TEMPLATES, ETC. SIMILAR TO GRINDSTONE
		    		'src/animate.js',
		    		'src/delay.js',
		    		'src/fade.js',
		    		'src/origin.js',
		    		'src/rotate.js',
		    		'src/scale.js',
		    		'src/set.js',
		    		'src/skew.js',
		    		'src/translate.js'
			    ],
			    dest: 'dist/shift-v<%= pkg.version %>.js'
		    }
		},
		
		uglify: {
		    options: {
		    	banner: '/* ShiftJS v<%= pkg.version %> | Copyright (c) <%= grunt.template.today('yyyy') %> Dan Zervoudakes | https://github.com/dzervoudakes/ShiftJS/blob/master/LICENSE */\n'
		    },
		    build: {
            	src: 'dist/shift-v<%= pkg.version %>.js',
				dest: 'dist/shift-v<%= pkg.version %>.min.js'
        	}
		},
		
		watch: {
			scripts: {
				files: ['<%= concat.dist.src %>'],
				tasks: ['build']
			}
		}
		
	});
	
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	grunt.registerTask('build', ['clean', 'concat', 'uglify']);
	
};