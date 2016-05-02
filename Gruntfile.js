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
			    dest: "dist/shift-v<%= pkg.version %>.js"
		    }
		},
		
		uglify: {
		    options: {
		    	banner: "/* ShiftJS v<%= pkg.version %> | Copyright (c) <%= grunt.template.today('yyyy') %> Dan Zervoudakes | https://github.com/dzervoudakes/ShiftJS/blob/master/LICENSE */\n"
		    },
		    build: {
            	src: "dist/shift-v<%= pkg.version %>.js",
				dest: "dist/shift-v<%= pkg.version %>.min.js"
        	}
		}
		
	});
	
	/* ADD "CLEAN" TASK HERE */
	
	/* ADD GRUNT WATCH TASK AND JUST HAVE THE TEST HTML FILE REFERENCE THE OUTPUT */
	
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	
	grunt.registerTask("build", ["concat", "uglify"]);
	
};