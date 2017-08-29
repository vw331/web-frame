define(["text!../../../template/welcome.htm"],function(htm){

    var WelcomeModule = function(){

        this.html = $(htm).html()
        this.template = Handlebars.compile( this.html )
        this.view = this.template({ title : '系统首页' })

    }

    WelcomeModule.prototype = {
        constructor : WelcomeModule,
        init : function(root){

            this.rootNode = root
            this.clear()
            this.render()
            this.bindEvent()
        },
        clear : function(){
            this.rootNode.empty()
        },
        bindEvent : function(){},
        render : function(){
            this.rootNode.append( this.view )
        },
    }

    return { WelcomeModule : WelcomeModule }

})