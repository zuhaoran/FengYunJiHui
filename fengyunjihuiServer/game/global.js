/**
 * Created by Administrator on 2018/3/1 0001.
 */
const db=require('./../utility/http/db');
const global={};
global.db=db();
module.exports= global;
