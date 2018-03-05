import global from "./global"
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
        }
    },

    // use this for initialization
    onLoad: function () {

    },

    login_buttonClick:function (event,customData) {
        console.log("/login, login button click:"+customData);
        var userName=this.userName_edit.string;
        var password=this.password_edit.string;
        //var json={"userName":userName,"password":password}
        var str="userName="+userName+"&password="+password;
        console.log("/login, str:"+str);
        var res= global.http.sendPost("/login sendPost",str);
        console.log("/login, res:"+res);

    },
    register_buttonClick:function (event,customData) {
        cc.log("/login, register button click:"+customData);
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
