
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')



const app = express()
const routes  = require('./routes/index')

app.use(express.static( path.join( __dirname , 'src' ) ))
app.use(express.static( path.join( __dirname ) ))
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', routes);


app.listen(3000,function(){

    console.log('server start')

})