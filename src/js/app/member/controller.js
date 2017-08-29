define([
    "text!../../../template/member.htm",
    "text!../../../template/memberAdd.htm",
    "text!../../../template/memberEdit.htm",
    "text!../../../template/feedback.htm",
    "app/member/model"],function( memberHtm , memberAddHtm , memberEditHtm , feedbackHtm , model ){

    var MemberModule , MemberModuleAdd ,MemberModuleEdit

    /*主视图*/
    MemberModule = function(){

        this.config = {}
        this.model = model
        this.html = $(memberHtm).html()
        this.template = Handlebars.compile( this.html )

    }

    MemberModule.Eles = {
        btnAdd  : '#button-add',
        btnEdit : '#button-edit',
        btnRemove : '#button-remove',
        tableWarp : '#table-warp'
    }

    MemberModule.prototype = {
        constructor: MemberModule,
        init : function(root){
            this.rootNode = root
            this.initStore()
            this.initState()
        },
        initStore : function(){
            this.viewStore = new this.model['ViewModel']()
        },
        initState : function(){
            var _this = this

            this.permission = app.permission.member

            this.viewStore.get()
                .then( function(data){
                    _this.allocation =  $.parseJSON( data )
                    _this.createView()
                })
        },
        createView : function(){
            this.view = this.template( {
                permission : this.permission,
                allocation : this.allocation
            } )
            this.render()
        },
        render : function(){
            this.clear()
            this.rootNode.append( this.view )

            this.initElements()
            this.bindEvent()
            this.createGrid()
        },
        clear : function(){
            this.rootNode.empty()
        },
        initElements : function(){
            var eles = MemberModule.Eles
            for(var name in eles)
            {
                this[name] = $(eles[name])
            }
        },
        bindEvent : function(){
            var _this = this
            this.rootNode.children()
                .on( 'click' , '#add' ,  _this.add.bind(this) )
                .on( 'click' , '#edit' , _this.edit.bind(this) )
                .on( 'click' , '#remove' , _this.remove.bind(this) )
        },
        createGrid : function(){

            this.tableWarp.bootstrapTable({
                url: '/member/list',         //请求后台的URL（*）
                method: 'get',                      //请求方式（*）
                toolbar: '#toolbar',                //工具按钮用哪个容器
                toolbarAlign : 'center',
                striped: false,                      //是否显示行间隔色
                cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: true,                   //是否显示分页（*）
                sortOrder: "asc",                   //排序方式
                sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
                pageNumber:1,                       //初始化加载第一页，默认第一页
                pageSize: 10,                       //每页的记录行数（*）
                pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
                strictSearch: true,
                minimumCountColumns: 2,             //最少允许的列数
                clickToSelect: true,                //是否启用点击选中行
                uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
                columns : [
                    {
                        field : 'id',
                        title : '序号'
                    },
                    {
                        checkbox : true
                    },
                    {
                        field : 'pkid',
                        title : '卡号'
                    },
                    {
                        field : 'name',
                        title : '姓名'
                    },
                    {
                        field : 'phoneNumber',
                        title : '手机号'
                    },
                    {
                        field : 'integral',
                        title : '积分'
                    },
                    {
                        field : 'historyConsumption',
                        title :'历史消费'
                    },
                    {
                        field : 'grade',
                        title : '等级'
                    },
                    {
                        field : 'createDate',
                        title : '开卡日期'
                    },
                    {
                        field : 'lastUseDate',
                        title : '最后使用日期'
                    },
                    {
                        field : 'binding',
                        title : '绑定'
                    },
                    {
                        field : 'source',
                        title : '来源'
                    },
                    {
                        field : 'operation',
                        title : '操作',
                        formatter : function(){
                            return '<button type="button" class="btn btn-default btn-sm">'+
                                '<span class="glyphicon glyphicon-pencil"></span>'+
                                '</button>'+
                                '<button type="button" class="btn btn-default btn-sm">'+
                                '<span class="glyphicon glyphicon-link"></span>'+
                                '</button>'+
                                '<button type="button" class="btn btn-default btn-sm">'+
                                '<span class="glyphicon glyphicon-remove"></span>'+
                                '</button>'
                        }
                    }
                ]
            })
        },
        destory : function(){},
        add : function(){
            app.go( "/member/add" );
        },
        edit : function(){
            app.go( "/member/edit" , { id : 00001 , pid : 428789 } );
        },
        remove : function(){ alert('remove') }
    }

    /*新增*/
    MemberModuleAdd = function(){

        this.config = {}
        this.model = model
        this.viewHtm = $(memberAddHtm).html()
        this.feedbackHtm = $(feedbackHtm).html()
        this.template = Handlebars.compile( this.viewHtm )
        this.feedbackTemplate = Handlebars.compile( this.feedbackHtm )

    }

    MemberModuleAdd.Eles = {
        memberAddForm  : '#member-add-form',
        datepickers : '.datepicker'
    }

    MemberModuleAdd.prototype = {
        constructor: MemberModuleAdd,
        init : function(root){
            this.rootNode = root
            this.initStore()
            this.initState()
        },
        initStore : function(){
            this.viewStore = new this.model['ViewModel']()
            this.MemberStore = new this.model['MemberModel']()
        },
        initState : function(){
            var _this = this
            this.permission = app.permission.member
            this.userInfor = app.userInfor

            this.viewStore.get()
                .then( function(data){
                    _this.allocation =  $.parseJSON( data )
                })
                .done(function(){
                    _this.createView()
                })
                .fail(function(){
                    console.error('请求数据出错了')
                })
        },
        createView : function(){
            this.view = this.template( {
                permission : this.permission,
                allocation : this.allocation,
                userInfor : this.userInfor
            } )
            this.render()
        },
        render : function(){
            this.clear()
            this.rootNode.append( this.view )

            this.initElements()
            this.initDatepicker()
            this.initForm()
            //his.bindEvent()
        },
        clear : function(){
            this.rootNode.empty()
        },
        initElements : function(){
            var eles = MemberModuleAdd.Eles
            for(var name in eles)
            {
                this[name] = $(eles[name])
            }
        },
        initDatepicker : function(){
            this.datepickers.datepicker({
            });
        },
        initForm : function(){
            var _this = this;
            var form = this.memberAddForm

            form.validator({
                delay : 1000,
                html : true,
                disable : false,
                feedback: {
                    success: 'glyphicon-ok000',
                    error: 'glyphicon-remove'
                }
            })
                .on('submit',function(e){

                    if (e.isDefaultPrevented()) {
                        toastr.warning('请完成表单填写!')
                    }
                    else
                    {
                        e.preventDefault()
                        _this.saveForm()
                    }

                })
        },
        saveForm : function(){

            var _this = this

            var formData = this.memberAddForm.serializeArray()

            this.MemberStore.add( formData )
                .then(function(data){

                    var data = JSON.parse(data)

                    if(data.state === 'success')
                    {
                        alert('success')
                        _this.createFeedbackView({
                            type : 'success',
                            title : '新增成功'
                        })

                    }
                    else if( data.state === 'error' )
                    {
                        _this.createFeedbackView({
                            type : 'error',
                            title : '失败',
                            msg : data.message
                        })
                    }
                    else
                    {
                        toastr.warning('出现了未知的错误')
                    }

                })

        },
        bindEvent : function(){
            var _this = this
            this.rootNode.children()
                .on( 'click' , '#add' ,  _this.add.bind(this) )
        },
        createFeedbackView : function( message ){
            this.feedbackView = this.feedbackTemplate( message )
            this.renderFeedbackView()
        },
        renderFeedbackView : function(){
            this.clear()
            this.rootNode.append( this.feedbackView )
        },
        destory : function(){},
        add : function(){ alert('add') },
        edit : function(){ alert('edit') },
        remove : function(){ alert('remove') }
    }

    /*编辑*/
    MemberModuleEdit = function(){

        this.config = {}
        this.model = model
        this.viewHtm = $(memberEditHtm).html()
        this.feedbackHtm = $(feedbackHtm).html()
        this.template = Handlebars.compile( this.viewHtm )
        this.feedbackTemplate = Handlebars.compile( this.feedbackHtm )

    }

    MemberModuleEdit.prototype = {
        constructor : MemberModuleEdit,
        init : function(root){
            this.rootNode = root
            this.initStore()
            this.initState()
        },
        initStore : function(){
            this.viewStore = new this.model['ViewModel']()
            this.MemberStore = new this.model['MemberModel']()
        },
        initState : function(){
            var _this = this

            this.permission = app.permission.member
            this.userInfor = app.userInfor
            this.memberParams = app.getUrlParameter()

            $.when( _this.viewStore.get() , _this.MemberStore.read( _this.memberParams )  )
                .then(function( a1 , a2 ){

                    if( a1[1] === 'success' && a2[1] === 'success' )
                    {
                        _this.allocation = JSON.parse( a1[0] )
                        _this.memberInfor = JSON.parse( a2[0] )
                    }

                })
                .done(function(){
                    _this.createView()
                })
                .fail(function(){
                    console.error('请求数据出错了')
                })
        },
        createView : function(){

            this.view = this.template( {
                permission : this.permission,
                allocation : this.allocation,
                memberInfor : this.memberInfor
            } )
            this.render()

        },
        render : function(){
            this.clear()
            this.rootNode.append( this.view )

            this.initElements()
            //this.initDatepicker()
            //his.bindEvent()
        },
        clear : function(){
            this.rootNode.empty()
        },
        initDatepicker : function(){
            this.datepickers.datepicker({
            });
        },
        initElements : function(){

        }
    }

    return {
        MemberModule : MemberModule,
        MemberModuleAdd : MemberModuleAdd,
        MemberModuleEdit : MemberModuleEdit
    }

})