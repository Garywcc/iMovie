module.exports=function(grunt){
	grunt.initConfig({
		concurrent: {
		  dev: {
		    tasks: ['nodemon', 'watch'],
		    options: {
		      logConcurrentOutput: true
		    }
		  }
		},
		nodemon: {
		  dev: {
		    script: 'app.js',
		    options: {
		       args: ['dev'],
		        nodeArgs: ['--debug']
		      },
		      env: {
		        PORT: '3000'
		      },
		      cwd: __dirname,
		      ignore: ['node_modules/**'],
		      ext: 'js',
		    
		      delay: 1000,
		      legacyWatch: true
		      }
		 },
		watch: {
		  server: {
		    files: ['views/*.ejs','routes/index.js'],
		   // tasks:['browserSync'],
		    options: {
		      livereload: true
		    }
		  }
		}
		/*browserSync: {
		    dev: {
		        bsFiles: {
		            src : 'views/*ejs'
		        },
		        options: {
		            proxy: "localhost:3001"
		        }
		      }
		  }*/
	});
	grunt.loadNpmTasks('grunt-contrib-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');
	//grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['concurrent']);
}