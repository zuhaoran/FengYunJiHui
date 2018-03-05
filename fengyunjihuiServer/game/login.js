/**
 * Created by zuhaoran on 2018/2/28 0028.
 */
const global=require('./global');
const login={
    panUser:async function (userName,password) {
        return new Promise(function(resolve, reject) {
            var sql = "select * from account where userName =" + userName;
            console.log("sql" + sql);
            try {
                var result = await
                global.db.select(sql);
            }
            catch (event) {
                result = "no"
            }
            console.log(result);
            var dbPassword = result[0]['password'];
            if (password == dbPassword) {
                result = false;
            }
            else {
                result = true;
            }
            resolve(result);
        })
    }
}
module.exports=login;