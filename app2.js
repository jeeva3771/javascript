var createError = require('http-errors')
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var cookieParser  = require('cookie-parser');
var logger = require('morgan')

var studentApiRouter = require('./routes2/api2/student2')
var studentUiRouter = require('./routes2/upi2/studentUi2')

var app =  express()

app.set('view engine', 'ejs')
app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({extended:true}))

app.use('/api/student',studentApiRouter)
app.use('/student',studentUiRouter)

app.get('/',function(req, res){
    res.render('pages2/index2')
})

const port = 3000
app.set(process.env.PORT || port)
app.listen(port,(err) => {
    if(err){
        console.log('unable to start server')
    }else{
        console.log('nodeexpress data api started running on: port'+ port);
    }
})
module.exports = app