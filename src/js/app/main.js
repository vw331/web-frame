
require.config({
    baseUrl : 'src/js',
    paths : {
        'jquery' : 'lib/jquery',
        'handlebars' : 'lib/handlebars',
        'text' : 'lib/text',
        'director' : 'lib/director',
        'toastr'  : 'plugins/toastr.min',
        'bootstrap' : 'plugins/bootstrap',
        'bootstrap-table' : 'plugins/bootstrap-table',
        'bootstrap-validator' : 'plugins/validator',
        'bootstrap-datepicker' : 'plugins/bootstrap-datepicker',

        'WelcomeModule' : 'app/home/controller',
        'MemberModule' : 'app/member/controller',
        'MemberModuleAdd' : 'app/member/controller',
        'MemberModuleEdit' : 'app/member/controller'
    },
    shim : {
        'bootstrap' : { deps : ['jquery'] },
        'bootstrap-table' : { deps : ['jquery'] },
        'bootstrap-validator' : { deps : ['jquery'] },
        'bootstrap-datepicker' : { deps : ['jquery'] },
    }
})


require([
    'jquery',
    'handlebars',
    'toastr',
    'bootstrap',
    'bootstrap-table',
    'bootstrap-datepicker',
    'bootstrap-validator',
    'app/index/index'],
    function($,handlebars,toastr,bootstrap,bootstrapTable,bootstrapDatepicker,bootstrapValidator,application){

    //初始化应用
    var app = new application()


    //注册全局变量
    window.toastr = toastr
    window.Handlebars = handlebars
    window.app = app

})