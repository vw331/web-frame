define(function(){
    function UserModel(){
        this.api = '/user'
    }

    UserModel.prototype = {
        get : function(params){
            return $.getJSON( this.api , params )
        },
        set : function(){

        }
    }

    return UserModel
})