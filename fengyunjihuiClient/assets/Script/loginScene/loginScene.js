import global from "../global"
cc.Class({
    extends: cc.Component,

    properties: {
        userName_edit: {
            default: null,
            type: cc.EditBox
        },
        password_edit: {
            default: null,
            type: cc.EditBox
        },
        userName_label:{
            default:null,
            type:cc.Label
        },
        password_label:{
            default:null,
            type:cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {
        cc.director.preloadScene('mainScene', function () {
            cc.log('Next scene preloaded');
        });
    },
    login_buttonReturn:function (response) {

    },
    login_buttonClick:function (event,customData) {
        console.log("/login, login button click:"+customData);
        var self=this;
        var user_id=self.userName_edit.string;
        var password=self.password_edit.string;
        //var json={"userName":userName,"password":password}
        var str="user_id="+user_id+"&password="+password;
        console.log("/login, str:"+str);
        var res=null;
        global.http.sendPost("login",str,function (response) {
            //console.log("/login, login_buttonReturn response:"+response);
            if(response=='no')
            {
                self.userName_label.string="账号输入错误";
                console.log("/login, 账号输入错误");
            }
            else if(response=='false')
            {
                self.password_label.string="密码输入错误";
                console.log("/login, 密码输入错误");
            }else
            {
                console.log(response);
                cc.director.loadScene("mainScene");
                console.log("/login, 切换场景");

            }
        });


    },
    register_buttonClick:function (event,customData) {
        cc.log("/login, register button click:"+customData);
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
