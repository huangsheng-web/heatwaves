const express = require('express');
// const static = require('express-static');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const consolidate = require('consolidate');
const multer = require('multer');
const mysql = require('mysql');
const multerObj = multer({dest:'./static/upload'})

var server = express();
server.listen(8080);

//1、获取请求数据
//get自带
server.use(bodyParser.urlencoded({extended:false}));
server.use(multerObj.any());

//2、cookie,session
server.use(cookieParser());
(function(){
  var keys = [];
  for(var i=0;i<100000;i++){
    keys[i] = 'a_'+Math.random()
  }
  server.use(cookieSession({
    name:'sess_id',
    keys:keys,
    maxAge:20*60*1000
  }))
})()
//3 模版
server.engine('html',consolidate.ejs);
server.set('views','template');
server.set('view engine','html');

//4、route
server.use('/',require('./route/web/index'));
server.use('/admin',require('./route/admin/index'));

//5、 default:static
server.use(express.static('static'))
