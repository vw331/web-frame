define(['jquery','text','director','app/index/UserModel'],function($,text,director,UserModel){


    var utils , Application;

    Application = function(){
        this.userModel = UserModel
        this.controllers = {}
        this.init()
    }

    //路由
    Application.routerMap = {
        '/home' : { urlPath : '/home', moduleName : 'WelcomeModule' ,  title : '系统首页' },
        '/member' : { urlPath : '/member', moduleName : 'MemberModule' , title : '会员管理' },
        '/member/add' : { urlPath : '/member/add' , moduleName : 'MemberModuleAdd' ,  title : ['会员管理','新增'] },
        '/member/edit' : { urlPath : '/member/edit' , moduleName : 'MemberModuleEdit' ,  title : ['会员管理','编辑'] }
    }

    //DOM
    Application.Eles = {
        body : 'body',
        view : '#view',
        menu : '#menu',
        navbar : '#route-path'
    }

    //权限
    Application.permission = {
        member : {
            add : true,
            edit : true,
            remove : true,
            charge : false,
            changeCard : true,
            delay : true,
            lock : true,
            getMoney : true,
            sendMsg : true,
            pointReset : true,
            coupon : true
        }
    }

    //基础类
    utils = {
        formatRouterMap: function (obj, callback) {
            var result = {}
            for (var key in obj) {
                result[key] = (function (param) {
                    return function () {
                        callback(param)
                    }
                })(obj[key])
            }
            return result
        }
    }

    Application.prototype = {
        constructor : Application,
        init : function(){
            this.permission = Application.permission
            this.initStore()
            this.initRouter()
            this.initElements()
        },
        initElements : function(){
            var eles = Application.Eles
            for(var name in eles)
            {
                this[name] = $(eles[name])
            }
        },
        initStore : function(){
            var _this = this
            this.userStore = new this.userModel()
            this.userStore.get({ id:userId }).then(function(data){
                _this.userInfor = data
            })
        },
        createModule : function(obj){

            var _this = this

            //先在this.controllers里查找需要创建的模块，如果有就创建，如果没有就先加载再创建

            if( _this.controllers[ obj.moduleName ] )
            {
                var currentModule = new  _this.controllers[ obj.moduleName ]

                currentModule.init( _this.view )

                _this.setNavbar(obj)
            }
            else
            {
                require([obj.moduleName],function(module){

                    $.extend( _this.controllers , module )

                    var currentModule = new module[ obj.moduleName ]

                    currentModule.init( _this.view )

                    _this.setNavbar(obj)
                })
            }

        },
        initRouter : function(){

            var _this = this

            var routerMap = utils.formatRouterMap( Application.routerMap , this.createModule.bind(this) )
            var router = new Router(routerMap)

            router.configure({
                on: _this.filterRouter,
                notfound : function(){
                    var r = confirm('正在施工<br/>,您来到了不存在的404页面。')
                    if(r)
                    {
                        history.back()
                    }
                }
            });

            router.init()
        },
        setNavbar : function(obj){

            var title = obj.title,
                urlPath = obj.urlPath.split('/'),
                pathHtml = '<li><a href="#">系统</a></li>'

            if( $.type(title) == 'array' )
            {
                var i=0
                while( title[i] )
                {
                    pathHtml += '<li class="active"><a href="#/'+urlPath[i+1]+'">'+title[i]+'</a></li>'
                    i++
                }
            }
            else
            {
                pathHtml += '<li class="active"><a href="#/'+urlPath[1]+'">'+ title +'</a></li>'
            }

            this.setMenu(obj)
            this.navbar.empty().append(pathHtml)

        },
        setMenu : function(obj){

            var path = obj.urlPath.split('/')[1];

            this.menu
                .find('a[href*="'+path+'"]')
                .parent().addClass('active').siblings().removeClass('active')

        },
        go : function(path,param ){

            if( param && $.type(param) === 'object' )
            {
                var parameter = ''

                for( var key in param )
                {
                    parameter+= key +'='+ param[key]+'&'
                }


                parameter = parameter.substring(0 , parameter.length-1 )

                location.hash = path + "?" + parameter
            }
            else
            {
                location.hash = path
            }

        },
        getUrlParameter : function(){

            var name,value
            var result = new Object()
            var str=location.href
            var num=str.indexOf("?")
            str=str.substr(num+1)

            var arr=str.split("&")
            for(var i=0;i < arr.length;i++){
                num=arr[i].indexOf("=");
                if(num>0){
                    name=arr[i].substring(0,num);
                    value=arr[i].substr(num+1);
                    result[name]=value;
                }
            }
            return result
        }
    }

    return Application
})