$(function(){

    $('#login-form')
        .on('submit',function(e){

            var _this = this,
                isCheck = false

            e.preventDefault()

            $('input', this ).each(function(index,item){
                if( $(item).val().trim() == '' )
                {
                    $('.text-danger',_this).show().text('请填写单位名称、用户名及密码')
                    isCheck = false
                    return false
                }
                else
                {
                    isCheck = true
                }
            })

            if( isCheck )
            {
                $('.text-danger',_this).hide()

                $.post( '/user' , $(this).serialize())
                .then(function(data){

                    var data = JSON.parse(data)
                    if( data.state == 'success' )
                    {
                        $('.state-warp').show()
                        setTimeout(function(){
                            window.open('./index.html', '_self' )
                        },1000)
                    }
                    else
                    {
                        $('.text-danger',_this).show().text('用户名或密码错误')
                    }

                })
            }


        })

})