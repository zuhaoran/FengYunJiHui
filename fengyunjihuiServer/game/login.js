/**
 * Created by zuhaoran on 2018/2/28 0028.
 */
const global=require('./global');
var Promise=require('Promise');
const login={
    panUser:async function (userName,password) {
        return new Promise(function(resolve, reject) {
            var sql = "select * from account where userName =" + userName;
            console.log("sql" + sql);
            var result= global.db.select(sql);
            var dbPassword = result[0]['password'];
            console.log("/game/login panUser() Password)");
            console.log("/game/login panUser() Password)"+password+"dbPassword="+dbPassword);

            if (password == dbPassword) {
                result = false;
            }
            else {
                result = true;
            }
            console.log("/game/login panUser() resolve(result)");
            console.log(result);
            resolve(result);
        });
    }
}
module.exports=login;