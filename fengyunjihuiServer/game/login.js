/**
 * Created by zuhaoran on 2018/2/28 0028.
 */
const global=require('./global');
var Promise=require('Promise');
const login={
    panUser:async function (userName,password) {
            var sql = "select * from account where userName =" + userName;
            console.log("sql" + sql);
            var result=await global.db.checkPlayer(userName);
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
                console.log("/game/login panUser() Password)");
                console.log("/game/login panUser() Password)"+password+"dbPassword="+dbPassword);
                if (password == dbPassword) {
                    result = "true";
                }
                else {
                    result = "false";
                }
            }
            console.log("/game/login panUser() resolve(result)");
            console.log(result);
        return result;
    }
}
module.exports=login;