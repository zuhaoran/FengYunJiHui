/**
 * Created by zuhaoran on 2018/2/28 0028.
 */
const global=require('./global');
var Promise=require('Promise');
const login={
    panUser:async function (user_id,password) {
            var result=await global.db.checkPlayer(user_id);
            console.log("/game/login panUser() result" + result);
            if(result==null||result=='')
            {
                console.log("/game/login panUser() if");
                result="no";
            }
            else
            {
                console.log("/game/login panUser() else");
                var dbPassword = result[0]['password'];
                if (password == dbPassword) {
                    result = this.getUserInfo(user_id);
                }
                else {
                    result = "false";
                }
            }
            console.log("/game/login panUser() resolve(result)");
            console.log(result);
        return result;
    },
    getUserInfo:async function (user_id) {
        var result=await global.db.checkUserInfo(user_id);
        console.log("/game/login getUserInfo() result" + result);
        return result;
    }
}
module.exports=login;