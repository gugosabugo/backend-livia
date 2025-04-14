const mysql = require('mysql');

const pool = mysql.createPool({
    "user":"root",
    "password":"root",
    "database":"mydb",
    "host":"localhost",
    "port":"3306"
});

exports.execute = (query, param = [], varPool = pool) => {
    return new Promise((resolve, reject) =>{
        varPool.query(query, param, (error, results) =>{
            if(error){
                reject(error)
            }else{
                resolve(results)
            }
        })
    })
}