/**
 * Created by LocNT on 7/28/15.
 */

var mysql     =    require('mysql');

var DB_CONFIG = {
    connectionLimit : 100, //important
    //host     : '104.236.31.239',
    host       : '188.166.237.78',
    user     : 'devchomoi',
    password : 'Devchomoi2015',
    database : 'chomoidb',
    debug    :  false
}

/*var DB_CONFIG = {
    connectionLimit : 101, //important
    host     : 'localhost',//188.166.237.78
   // port : 3306,
    user     : 'root',
    password : 'Devchomoi2015',
    database : 'chomoidb',
    debug    :  false
}*/

exports.pool = mysql.createPool(DB_CONFIG);