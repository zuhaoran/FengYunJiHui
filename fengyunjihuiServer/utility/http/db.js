/**
 * Created by zuhaoran on 2018/3/1 0001.
 */
const db=function () {
    var that= {};
    var mysql = require('mysql');
    /*var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'test'
    });*/

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





    //***********************************************************************************************
    //连接池
    let client = undefined;

    //查询函数
    const query =async  function (sql, cb) {
        return new Promise(function(resolve, reject) {
            console.log('query = ' + sql);
            client.getConnection(function (err, connection) {
                if (err) {
                    console.log('connection mysql err = ' + err);
                    cb(err);
                    throw err;
                } else {
                    connection.query(sql, function (connerr, result, fileds) {
                        if (connerr) {
                            console.log('query err = ' + connerr);
                            cb(connerr);
                        } else {
                            cb(null, result);
                        }

                        connection.release();
                    })
                }
            });
            resolve(cb);
        })
    };

    //拼接插入语句
    const insertSql = function (table, data) {
        let sql = 'insert into ' + table;
        // (123,1234,345,36)l
        let valuesStr = 'values(';
        let keyStr = ' (';
        for (let i in data){
            keyStr += i + ',';
            if((typeof data[i]).indexOf('string') === 0){
                valuesStr += "'" + data[i] + "'"+ ',';

            }else {
                valuesStr += data[i] + ',';
            }
        }
        keyStr = keyStr.substring(0, keyStr.length - 1);
        keyStr += ') ';
        valuesStr = valuesStr.substring(0, valuesStr.length - 1) ;
        valuesStr += ") ";
        sql += keyStr + valuesStr;
        return sql;
    };

    //拼接更新语句
    const updateSql = function (tabel,mainKey, mainValue, data) {
        let sql = 'update ' + tabel + ' set ';
        for (let i in data){
            if ((typeof data[i]).indexOf('string') === 0){
                sql += i + '=' + "'" + data[i] +"'" + ',';

            }else {
                sql += i + '=' + data[i]  + ',';
            }
        }
        sql = sql.substring(0, sql.length - 1);
        if ((typeof mainValue).indexOf('string') === 0){
            sql += ' where ' + mainKey + '= ' + "'" + mainValue + "'" + ';';

        }else {
            sql += ' where ' + mainKey + '= ' + mainValue + ';';
        }
        return sql;
    };

    //查询玩家
    that.checkPlayer =async function (userName) {
        return new Promise(function(resolve, reject) {
            //查找玩家数据
            let sql = "select * from account where  userName = " + userName + ";";
            query(sql, function (err, data) {
                if (err) {
                    console.log('err = ' + err);
                }
                console.log('check player = ' + JSON.stringify(data));
                //cb(err, data);
                resolve(data);
            });
        });
    };

    //插入玩家信息
    that.insertPlayerInfo = function (data) {
        //插入玩家数据
        let sql = insertSql('t_playerinfo', data);
        console.log('sql = ' + sql);
        // INSERT INTO tbl_name (col1,col2) VALUES(15,col1*2);
        // let sql = 'insert into t_playerinfo (unique_id, uid, nick_name, avatar_url, house_card_count) values(' + data.uniqueID + ',' + data.uid + ')'
        query(sql, function (err, res) {
            if (err ){
                console.log('insert player info err =  ' + err);
            }else {
                console.log('res = ' + JSON.stringify(res));
            }
        })
    };

    //更新玩家信息
    that.updatePlayerInfo = function (mainKey,mainValue,data) {
        //更新玩家数据
        let  sql = updateSql('t_playerinfo', mainKey,mainValue,data);
        query(sql, function (err, data) {
            if (err){
                console.log('update player info =' + err);
            }else {
                console.log('update player info success = ' + JSON.stringify(data));
            }
        })
    };

    //创建连接池
    that.connect = function (config) {
        client = mysql.createPool(config);
        console.log("创建连接池");
    };
    return that;
};
module.exports= db;