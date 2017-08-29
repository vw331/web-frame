define(function(){

    function ViewModel(){
        this.api = '/member/viewdata'
    }

    ViewModel.prototype = {
        get : function(){
            return $.getJSON(this.api)
        },
        set : function(){

        }
    }

    function MemberModel(){
        this.api = {
            read : 'member/read',
            update : 'member/set',
            add  : 'member/add',
            destory : 'member/destory'
        }
    }

    MemberModel.prototype = {
        add : function(params){
            return $.post( this.api.add , params )
        },
        read : function(params){

            if( $.type(params) !== 'object' ) return false
            if( params.id === undefined || params.id === null || params.id === '' )
            {
                alert('参数不合法')
                history.back()
            }

            return $.get( this.api.read , params )
        },
        update : function(){

        },
        destory : function(){

        }
    }

    return {
        ViewModel : ViewModel,
        MemberModel : MemberModel
    }
})