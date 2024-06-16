var createError = require('http-errors');
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var cookieParser  = require('cookie-parser');
var logger = require('morgan')

var studentApiRouter = require('./routes/api/student')

var studentUiRouter = require('./routes/ui/studentUi');

var app = express()

app.set('view engine', 'ejs');

app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({extended:true}))

app.use('/api/student/',studentApiRouter);

app.use('/student/',studentUiRouter);

app.get('/',function(req,res){
    res.render('pages/index')
})

const port = 3200
app.set(process.env.PORT || port)
app.listen(port , (err) => {
    if(err)
    {
      console.log('Unable to start the server!');
    }
    else
      console.log('NodeExpress Data API started running on : ' + port);
  })

module.exports = app;