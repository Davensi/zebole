
const dbconfig = require('../config/sqlConfig')
const mysql =require('mysql')
const con = mysql.createConnection(dbconfig);
//连接mysql
con.connect(function(err){
    if(err)  throw err;
    console.log('链接成功');
});
function query(sql){
    return new Promise((resolve,reject) => {
        con.query(sql,(err,result)=>{
            if(err) {
                reject(err)
            }
            resolve(result);  
        })
    })
}

module.exports = query;