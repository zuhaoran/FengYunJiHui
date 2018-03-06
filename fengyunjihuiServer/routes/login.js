/**
 * Created by Administrator on 2018/3/1 0001.
 */

var express = require('express');
var router = express.Router();
const global=require('../game/global');
var login=require('../game/login');
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended:false}));
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.post('/',async function (request,response) {
    var userName=request.body.userName;
    var password=request.body.password;
    var result=await login.panUser(userName,password);
    console.log("/routes/login / result");
    console.log(result);
    response.send(result);
})
module.exports = router;
