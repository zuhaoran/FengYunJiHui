
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
const Http=function () {
    var that={};
    var url="http://127.0.0.1:3000/";
    that.sendGet = function(ServerLink,str){
        if(ServerLink===null) {
            ServerLink = url;
        }
        else
        {
            ServerLink = url+ServerLink;
        }
        ServerLink=ServerLink+"?"+str;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;
                console.log("response"+response);
                return response;
            }
        };
        xhr.open("GET", ServerLink, true);
        xhr.send();
    };
    that.sendPost= function (ServerLink,str,cb) {
        console.log("/http sendPost()");
        //var str="name=1&password=2"
        if(ServerLink===null) {
            ServerLink = url;
        }
        else
        {
            ServerLink = url+ServerLink;
        }
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 400)) {
                console.log("连接成功");
                var response = xhr.responseText;
                console.log("response");
                console.log(response);
                cb(response);
                return response;
            }
        };
        xhr.open("POST", ServerLink);
        xhr.send(str);
        return xhr.responseText;
    };
    return that;
};
export default Http;