// ShiftJS Gruntfile
//
module.exports = function(grunt){

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		concat: {
		    dist: {
			    src: [
				    "shift.js",
		    		"extensions/animate.js",
		    		"extensions/delay.js",
		    		"extensions/fade.js",
		    		"extensions/origin.js",
		    		"extensions/rotate.js",
		    		"extensions/scale.js",
		    		"extensions/set.js",
		    		"extensions/skew.js",
		    		"extensions/translate.js"
			    ],
			    dest: "bin/<%= pkg.name %>-v<%= pkg.version %>.js"
		    }
		},
		uglify: {
		    options: {
		    	banner: "/* ShiftJS v<%= pkg.version %> | Copyright (c) <%= grunt.template.today('yyyy') %> Dan Zervoudakes | https://github.com/DanZiti/ShiftJS/blob/master/LICENSE */\n" // WILL NEED TO UPDATE COPYRIGHT DATE IN 2016
		    },
		    build: {
            	src: "bin/<%= pkg.name %>-v<%= pkg.version %>.js",
				dest: "bin/<%= pkg.name %>-v<%= pkg.version %>.min.js"
        	}
		}
	});
	
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	
	grunt.registerTask("default", ["concat","uglify"]);
	
};