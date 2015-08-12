/**
 * Created by LocNT on 7/28/15.
 */

var Q = require('q');

var DbConfig = require("./DatabaseConfig");
var pool = DbConfig.pool;
var SqlQueryContant = require("../helpers/SqlQueryContant");

/**
 * Object MysqlHelper is generic Dao
 * @param tablename : string - table name of db table
 */
var MysqlHelper = function(tableName){
    this.tableName = tableName;
}

/**
 * Execute a query
 * @param sql : string
 * @param params : []
 */
var queryExecute = function(sql, params) {
    var deferred = Q.defer();
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
};

/**
 * Find all record with active = 1
 */
var findAllActive = function() {
    var deferred = Q.defer();
    var sql = SqlQueryContant.GENERIC_SQL.SLQ_FINDALL_ACTIVE;
    var params = [this.tableName];
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
};

/**
 * find one by id
 * @param id : number
 */
var findOneById = function(id) {
    var deferred = Q.defer();
    var sql = SqlQueryContant.GENERIC_SQL.SLQ_FINDONE_BY_ID;
    var params = [id];
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
};

/**
 * add new
 * @param obj : Object
 */
var addNew = function(obj) {
    var deferred = Q.defer();
    var sql = SqlQueryContant.GENERIC_SQL.SLQ_ADD_NEW;
    var params = [this.tableName, obj];
    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            deferred.reject(err);
        }else{
            connection.query(sql, params, function(err,result){
                connection.release();
                if(err) {
                    deferred.reject(err);
                }else{
                    deferred.resolve(result);
                }
            });
        }
    });
    return deferred.promise;
};

/**
 * update
 * @param obj : Object
 * @param id : Number
 */
var update = function(obj, id) {
    var deferred = Q.defer();
    var sql = SqlQueryContant.GENERIC_SQL.SLQ_UPDATE;
    var params = [this.tableName, obj, id];
    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            deferred.reject(err);
        }else{
            connection.query(sql, params, function(err,result){
                connection.release();
                if(err) {
                    deferred.reject(err);
                }else{
                    deferred.resolve(result);
                }
            });
        }
    });
    return deferred.promise;
};

/**
 * inactivate
 * @param id : Number
 */
var inactivate = function(id) {
    var deferred = Q.defer();
    var sql = SqlQueryContant.GENERIC_SQL.SLQ_DO_INACTIVE;
    var params = [this.tableName, id];
    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            deferred.reject(err);
        }else{
            connection.query(sql, params, function(err,result){
                connection.release();
                if(err) {
                    deferred.reject(err);
                }else{
                    deferred.resolve(result);
                }
            });
        }
    });
    return deferred.promise;
};

/**
 * remove
 * @param id : Number
 */
var remove = function(id) {
    var deferred = Q.defer();
    var sql = SqlQueryContant.GENERIC_SQL.SLQ_REMOVE;
    var params = [this.tableName, id];
    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            deferred.reject(err);
        }else{
            connection.query(sql, params, function(err,result){
                connection.release();
                if(err) {
                    deferred.reject(err);
                }else{
                    deferred.resolve(result);
                }
            });
        }
    });
    return deferred.promise;
};

/*Export*/
MysqlHelper.prototype.queryExecute = queryExecute;
MysqlHelper.prototype.findAllActive = findAllActive;
MysqlHelper.prototype.findOneById = findOneById;
MysqlHelper.prototype.addNew = addNew;
MysqlHelper.prototype.update = update;
MysqlHelper.prototype.inactivate = inactivate;
MysqlHelper.prototype.remove = remove;
module.exports = MysqlHelper;