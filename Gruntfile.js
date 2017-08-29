module.exports = function(grunt){

    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),

        less : {
            dev : {
                options : {
                    style : 'compressed',
                    report: true,
                    outputSourceFiles: true,
                    sourceMap : true,
                    sourceRoot:''
                },
                files : {
                    'src/css/style.css' : ['src/css/*.less','!src/css/login.less'],
                    'src/css/login.css' : ['src/css/login.less']
                }
            }
        },

        copy : {
            dev : {
                files : [
                    {expand: true,flatten: true,cwd:'node_modules/bootstrap/dist/css/', src: ['bootstrap.css','bootstrap.css.map'], dest: 'src/css/', filter: 'isFile'},
                    {expand: true,flatten: true,cwd:'node_modules/bootstrap/dist/fonts',src:['**'],dest:'src/fonts',filter:'isFile'},
                    {expand: true,flatten: true,cwd:'node_modules/',src:[
                        'bootstrap-table/dist/bootstrap-table.css',
                        'bootstrap-datepicker/dist/css/bootstrap-datepicker.css',
                        ],dest:'src/css/',filter:'isFile'}
                ]
            },
            build : {
                files : [
                    {expand: true,flatten: true,cwd:'src/fonts',src:['**'],dest:'build/fonts',filter:'isFile'}
                ]
            }
        },

        jshint : {
            dev : {
                all : ['src/js/app/**/*.js'],
                options : {
                    browser: true,
                    devel: true,
                    jshintrc : '.jshintrc'
                }
            }
        },

        watch : {
            dev : {
                files : ['src/js/app/**/*.js','src/css/*.css','src/css/*.less','node_modules/bootstrap/dist/css/*.css'],
                tasks : ['jshint','less:dev'],
                options : { spawn : false ,livereload:true }
            }
        },

        concat : {
            build : {
                files : {
                    'build/css/all-<%= pkg.version %>.css' : ['src/css/*css']
                }
            }
        },

        cssmin : {
            build : {
                files: {
                    'build/css/all-<%= pkg.version %>.min.css': ['build/css/*.css']
                }
            }
        },

        requirejs : {
            build : {
                options : {
                    baseUrl : 'src/js',
                    mainConfigFile: 'src/js/app/main.js',
                    optimize: "uglify",
                    include: [
                        './app/main.js',
                        './lib/director.js',
                        './lib/jquery.js',
                        './lib/require.js',
                        './lib/text.js',
                        './lib/handlebars.js',
                        './plugins/bootstrap.js',
                        './plugins/bootstrap-datepicker.js',
                        './plugins/bootstrap-table.js',
                        './plugins/toastr.js',
                        ],
                    out : 'build/js/all.js'
                }
            }
        }

    })


    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-contrib-concat')
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-contrib-less')
    grunt.loadNpmTasks('grunt-contrib-jshint')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-cssmin')
    grunt.loadNpmTasks('grunt-contrib-livereload')
    grunt.loadNpmTasks('grunt-contrib-requirejs')


    grunt.registerTask('default',['copy:dev','jshint:dev','less:dev','watch:dev'])
    grunt.registerTask('build',['copy:build','concat:build','cssmin:build','requirejs:build'])
}