/**
 * Created by zuhaoran on 2018/3/1 0001.
 */
const db=function () {
    var that= {};
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'test'
    });



    /*var sleep = function (sql) {
     return new Promise(function (resolve, reject) {
     getResult(function () {
     var res=null;
     connection.query(sql,function (err, result) {
     if(err){
     console.log('[SELECT ERROR] - ',err.message);
     console.log("result"+result);
     return 0;
     }
     console.log('--------------------------SELECT----------------------------');
     console.log(result);
     res=result;
     //var res=[]
     // res[0]=result[0];
     //var dbPassword=res[0]['password'];
     //console.log(res);
     console.log('------------------------------------------------------------\n\n');
     });
     console.log("res2="+res);
     return res;
     }, sql);
     })
     };*/
    var getResult=async  function(sql){

    }

    //*********************************************************************************************
    //输入sql语句，返回result
    that.select=async function (sql) {
        return new Promise(function(resolve, reject){
            {
                connection.connect();
                connection.query(sql, function (err, result) {
                    if (err) {
                        console.log('[SELECT ERROR] - ', err.message);
                        console.log("result" + result);
                        return 0;
                    }
                    console.log('--------------------------SELECT----------------------------');
                    console.log(result);
                    console.log('------------------------------------------------------------\n\n');
                    resolve(result);
                });
                connection.end();
            }
        })


//查
        /*connection.query(sql,function (err, result) {
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                console.log("result"+result);
                return 0;
            }
            console.log('--------------------------SELECT----------------------------');
            console.log(result);
             res=result;
            console.log('------------------------------------------------------------\n\n');
        });

        console.log("res2="+res);

        connection.end();
        return result;*/
    };
    //*********************************************************************************************
    //输入sql语句或 带？的sql和对应数组，返回result
    that.insert=function (sql,sqlParams) {
        connection.connect();
       // var  addSql = 'INSERT INTO websites(Id,name,url,alexa,country) VALUES(0,?,?,?,?)';
        //var  addSqlParams = ['菜鸟工具', 'https://c.runoob.com','23453', 'CN'];
//增
        var res=null;
        var addSql=sql;
        var addSqlParams=sqlParams;
        connection.query(addSql,addSqlParams,function (err, result) {
            if(err){
                console.log('[INSERT ERROR] - ',err.message);
                return result;
            }
            var addSql =sql;
            var addSqlParams=sqlParams;
            if(addSqlParams==null)
            {
                connection.query(addSql,function (err, result) {
                    if (err) {
                        console.log('[UPDATE ERROR] - ', err.message);
                        return result;
                    }
                });
            }
            else
            {
                connection.query(addSql,addSqlParams,function (err, result) {
                    if (err) {
                        console.log('[UPDATE ERROR] - ', err.message);
                        return result;
                    }
                });
            }
            console.log('--------------------------INSERT----------------------------');
            //console.log('INSERT ID:',result.insertId);
            console.log('INSERT ID:',result);
            res=result;
            console.log('-----------------------------------------------------------------\n\n');
        });
        connection.end();
        return res;
    };
    //*********************************************************************************************
    //输入sql语句或 带？的sql和对应数组，返回resul.taffectedRows
    that.update=function (sql,sqlParams) {
        connection.connect();
        var affectedRows=0;
        //var modSql = 'UPDATE websites SET name = ?,url = ? WHERE Id = ?';
        //var modSqlParams = ['菜鸟移动站', 'https://m.runoob.com',6];
//改
        var modSql =sql;
        var modSqlParams=sqlParams;
        if(modSqlParams==null)
        {
            connection.query(modSql,function (err, result) {
                if (err) {
                    console.log('[UPDATE ERROR] - ', err.message);
                    return result;
                }
            });
        }
        else
        {
            connection.query(modSql,modSqlParams,function (err, result) {
                if (err) {
                    console.log('[UPDATE ERROR] - ', err.message);
                    return result;
                }
            });
        }
            console.log('--------------------------UPDATE----------------------------');
            console.log('UPDATE affectedRows',result.affectedRows);
            affectedRows=result.affectedRows;
            console.log('-----------------------------------------------------------------\n\n');
        connection.end();
        return affectedRows;
    };
    //*********************************************************************************************
    //输入sql语句，返回resul.taffectedRows
    that.delete=function (sql) {
        connection.connect();

        //var delSql = 'DELETE FROM websites where id=6';
//删
        var delSql=sql;
        var affectedRows=0;
        connection.query(delSql,function (err, result) {
            if(err){
                console.log('[DELETE ERROR] - ',err.message);
                return;
            }

            console.log('--------------------------DELETE----------------------------');
            console.log('DELETE affectedRows',result.affectedRows);
            affectedRows=result.affectedRows;
            console.log('-----------------------------------------------------------------\n\n');
        });

        connection.end();
        return affectedRows;
    };
    return that;
};
module.exports= db;
