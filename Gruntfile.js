// ShiftJS Gruntfile
//
module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		concat: {
		    dist: {
			    src: [
				    "src/shift.js", // INCLUDE THIS FILE BEFORE ALL OTHERS
		    		"src/animate.js",
		    		"src/delay.js",
		    		"src/fade.js",
		    		"src/origin.js",
		    		"src/rotate.js",
		    		"src/scale.js",
		    		"src/set.js",
		    		"src/skew.js",
		    		"src/translate.js"
			    ],
			    dest: "dist/<%= pkg.name %>-v<%= pkg.version %>.js"
		    }
		},
		uglify: {
		    options: {
		    	banner: "/* ShiftJS v<%= pkg.version %> | Copyright (c) <%= grunt.template.today('yyyy') %> Dan Zervoudakes | https://github.com/DanZiti/ShiftJS/blob/master/LICENSE */\n"
		    },
		    build: {
            	src: "dist/<%= pkg.name %>-v<%= pkg.version %>.js",
				dest: "dist/<%= pkg.name %>-v<%= pkg.version %>.min.js"
        	}
		}
	});
	
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	
	grunt.registerTask("default", ["concat", "uglify"]);
	
};