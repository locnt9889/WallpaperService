/**
 * Created by LocNT on 7/28/15.
 */

var mysql     =    require('mysql');

var DB_CONFIG = {
    connectionLimit : 100, //important
    host     : '104.236.31.239',
    user     : 'developer',
    password : 'developer2015',
    database : 'nodejsmysql',
    debug    :  false
}

exports.pool = mysql.createPool(DB_CONFIG);