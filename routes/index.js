const express = require('express')
const router = express.Router()


const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '576287894',
    database : 'membersystem'
});

connection.connect();

router.get('/member/viewdata',function(req,res){

    res.json(JSON.stringify({ level : ['普通会员','VIP会员','钻石会员','黄金会员','高级会员','顶级会员','aaa'] }))

})

router.get('/member/list',function(req,res){

    connection.query('SELECT * from `member`',( err , data ) => {


        let datas = {
            pageSize : 20,
            pageNumber : 1,
            orderNum : 1,
            total : 20,
            rows : data

        }

        res.send(JSON.stringify(datas))

    })

})

router.get('/member/read', (req,res) => {

    var datas = {
        name : '刘丽',
        pkid : '74897797498789',
        phoneNumber : '157894897',
        age : '18',
        grade : 2,
        state : 1,
        email : '57687897@gmial.com',
        number : 057156077609,
        id : 420587897487897,
        birthday : '1985/05/21',
        business : '庆春路路口',
        address : '浙江省杭州市西湖区文三路东部软件园'
    }

    res.send( JSON.stringify( datas ) )

})

router.post('/user',(req,res) => {

    let userInfor = req.body

    connection.query('SELECT * FROM `user` WHERE username="' + userInfor.username + '"',(err,data) => {


        if( data.length > 0 && ( Number( data[0].password ) === Number( userInfor.password ) ) )
        {

            res.cookie
            res.send( JSON.stringify( { state : 'success' } ) )
        }
        else
        {
            res.send( JSON.stringify( { state : 'error' } ) )
        }

    })

})


router.get('/user', (req,res) => {

    let id = req.query.id

    if( !id ) throw err

    let data = {
        username : 'sunhao',
        phone : 123456
    }

    connection.query('SELECT * FROM `user` WHERE id='+id+'',(err,data)=>{

        res.send( JSON.stringify( data[0] ) )

    })

})


router.post('/member/add', (req,res) => {


    var param =  req.body


    new Promise((resolve,reject)=>{

        connection.query('INSERT INTO `member` ( name , phoneNumber , integral , grade ) ' +
        'VALUES ' +
        '( " '+ param.name  +' " , "11878787"  , "'+ "47897878" +'" , "'+ param.grade +'" )' , resolve )

    })
    .then(( error , data )=>{

        if( error )
        {
            console.error(  error )
            res.send( JSON.stringify({state : 'error' }) )
        }
        else
        {
            res.send( JSON.stringify({ state : 'success' }) )
        }



    })



})

module.exports  = router