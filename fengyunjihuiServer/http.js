/**
 * Created by Administrator on 2018/3/1 0001.
 */
import * as login from './game/login';
var express = require('express');

var bodyParser = require('body-parser');

var app = express();
app.use(express.static('wwwroot'));
app.use(bodyParser.urlencoded({extended:false}));

app.post('/login',function (request,response) {
    //var login=requir("./login")
    //console.log("开始判断")
    //login.panUser(request.query.userName,request.query.password);
    console.log("开始判断")
    var res=login.panUser(request.query.userName,request.query.password);
    response.send('已经接收到用post方法发送来的评价'+res);
})
