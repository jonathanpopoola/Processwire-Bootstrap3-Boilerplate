module.exports = function(grunt){

	// let the package file load our dependicies 

	/***

		TO DO, UPDATE ALL VARS TO HANDLE BAR VARS
	
	***/

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner: 
			'/**\n' +
			' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
			' * <%= pkg.homepage %>\n' +
			' *\n' +
			' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
			' * Licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' +
			' */\n'
		},
		jsDir: 'assets/js/',
		jsSource: 'src/js/',
		cssDir: 'assets/css/',
		cssLessCss: 'src/less/',
		bootstrapSrc: 'src/bootstrap/',
		concat: {
			bootstrap: {
				src: [
				'<%=bootstrapSrc%>js/transition.js',
				'<%=bootstrapSrc%>js/alert.js',
				'<%=bootstrapSrc%>js/button.js',
				'<%=bootstrapSrc%>js/carousel.js',
				'<%=bootstrapSrc%>js/collapse.js',
				'<%=bootstrapSrc%>js/dropdown.js',
				'<%=bootstrapSrc%>js/modal.js',
				'<%=bootstrapSrc%>js/tooltip.js',
				'<%=bootstrapSrc%>js/popover.js',
				'<%=bootstrapSrc%>js/scrollspy.js',
				'<%=bootstrapSrc%>js/tab.js',
				'<%=bootstrapSrc%>js/affix.js'
				],
				dest: '<%=jsDir%>custom-bootstrap.js'
			},
			allibs: {
				src: ['<%=jsSource%>libs/*.js'],
				dest: '<%=jsDir%>combined-libs.js'
			},
			lesscombine: {
				src: ['src/less/**/*.css',  'src/less/**/*.less', '!src/less/styles.less', '!src/less/variables.less', '!src/less/semi-combined.less','!src/less/completed.less'],
				dest: 'src/less/semi-combined.less'
			},
			finish: {
				src:['src/less/styles.less', 'src/less/semi-combined.less'],
				dest: 'src/less/completed.less'
			}
		},
		copy: {
			mainjs: {
				files: [
      // includes files within path
      {expand: true, src: ['<%jsSource%>*'], dest: '<%jsDir%>', flatten: true, filter: 'isFile'}
      ]
  }
},
uglify: {
	files: { 
		src: '<%jsDir%>*.js',  
		dest: '<%jsDir%>',  
		expand: true,  
		flatten: true,  
		ext: '.min.js'
	}
},
jshint: {
	all: {
		src: 'assets/js/**.js',
		options: {
			"globals": {
			    "jQuery": true,
			    "window": true,
			    "document": true
			  },
		ignores: [
			'assets/js/combined-libs.js',
			'assets/js/custom-bootstrap.js',
			'assets/js/*.min.js'
		],
			forin: true,
			noarg: true,
			eqeqeq: true,
			bitwise: true,
			undef: true,
			unused: false,
			curly: true,
			browser: true,
			devel: true,
			smarttabs: false,
			asi : true,
			expr: true
		}
	}
},
less: {
	lessall: {
		files: {
			"assets/css/styles.css": "src/less/completed.less"
		}
	}
},
cssmin: {
	minall: {
				src: 'assets/css/styles.css', // perfer to combine all my less with includes in the main less file
				dest: 'assets/css/styles.css'
			}
},
watch: { 
			js: {
				files: ['src/js/**/*.js'],
				tasks: ['buildjs']
			},
			less: {

				files: 'src/less/**/*.less',
				tasks: 'buildless'  
			},
			images: {
				files: ['src/uncompressedImg/**/*.{png,jpg,gif}'],
				tasks: 'imageminall'
			}
},
		imagemin: {   
			options: {
				optimizationLevel: 3
			},                       
			dynamic: {                        
				files: [{
					expand: true,                 
					cwd: 'src/uncompressedImg',         
					src: ['**/*.{png,jpg,gif}'],  
					dest: 'assets/img'                  
				}]
			}
		},
		clean: ["src/uncompressedImg/*"],
		fileblocks: {
			options: {
				"prefix": "/site/templates/" 
			},
			todos: {
				files: [
				{
					src: 'common/head.inc',
					blocks: {
						'mainstyle': { src: 'assets/css/*.css' }
					}
				},
				{
					src: 'common/footer.inc',
					blocks: {
						'allscripts': { src: 'assets/js/*min.js' }
					}
				}
				]
			}
		}
	});

grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-file-blocks');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.registerTask('buildless',  ['concat:lesscombine', 'concat:finish', 'less', 'cssmin']);
grunt.registerTask('buildjs',  ['concat:bootstrap', 'concat:allibs', 'copy:mainjs', 'jshint', 'uglify', 'fileblocks']);
grunt.registerTask('imageminall', ['imagemin', 'clean']);
grunt.registerTask('build', ['buildless', 'imageminall', 'buildjs'])
grunt.registerTask('default', ['build']);

};