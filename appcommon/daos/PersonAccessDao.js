/**
 * Created by LocNT on 7/30/15.
 */

var Q = require("q");

var DbConfig = require("../helpers/DatabaseConfig");
var pool = DbConfig.pool;

var SqlQueryContant = require("../helpers/SqlQueryContant");
var MysqlHelper = require("../helpers/MysqlHelper");

var PersonAccessDao = new MysqlHelper("person_access");
var checkAccessToken = function(accessToken){
    var deferred = Q.defer();
    var sql = SqlQueryContant.ACCESS_TOKEN_MODULE.SQL_CHECK_ACCESS;
    var params = [accessToken];
    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            deferred.reject(err);
        }else{
            connection.query(sql, params, function(err,rows){
                connection.release();
                if(err) {
                    deferred.reject(err);
                }else{
                    deferred.resolve(rows);
                }
            });
        }
    });
    return deferred.promise;
}

/*Export*/
MysqlHelper.prototype.checkAccessToken = checkAccessToken;
module.exports = PersonAccessDao;