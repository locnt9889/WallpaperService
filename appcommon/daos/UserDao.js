/**
 * Created by LocNT on 7/30/15.
 */
var Q = require("q");
//var DbConfig = require("./DatabaseConfig");
//var pool = DbConfig.pool;
var SqlQueryConstant = require("../helpers/SqlQueryConstant");

var MysqlHelper = new require("../helpers/MysqlHelper");
var Constant = require("../helpers/Constant");
var userDao = new MysqlHelper(Constant.TABLE_NAME_DB.USER);


MysqlHelper.prototype.test = function(){
    console.log("test");
}

MysqlHelper.prototype.checkEmailExist = function(email){
    var sql = SqlQueryConstant.USER_SQL_SCRIPT.CHECK_EMAIL_EXIST;
    var params = [email];
    return userDao.queryExecute(sql, params);
};

MysqlHelper.prototype.getUserStatusByValue = function(value){
    var sql = SqlQueryConstant.USER_SQL_SCRIPT.USER_STATUS_SCRIPT.GET_USER_STATUS_ID_BY_VALUE;
    var params = [value];
    return userDao.queryExecute(sql, params);
};

MysqlHelper.prototype.checkLogin = function(email, password){
    var sql = SqlQueryConstant.USER_SQL_SCRIPT.CHECK_LOGIN;
    var params = [email, password];
    return userDao.queryExecute(sql, params);
};

MysqlHelper.prototype.findDeviceTokenByValue = function(deviceToken){
    var sql = SqlQueryConstant.USER_SQL_SCRIPT.FIND_DEVICE_TOKEN_BY_VALUE;
    var params = [deviceToken];
    return userDao.queryExecute(sql, params);
};

MysqlHelper.prototype.changePassword = function(userID, newPasswordMD5){
    var sql = SqlQueryConstant.USER_SQL_SCRIPT.SLQ_CHANGE_PASSWORD;
    var params = [newPasswordMD5, userID];
    return userDao.queryExecute(sql, params);
};

MysqlHelper.prototype.getUserProfileById = function(userID){
    var sql = SqlQueryConstant.USER_SQL_SCRIPT.SQL_GET_USER_PROFILE;
    var params = [userID];
    return userDao.queryExecute(sql, params);
};

/*Export*/
module.exports = userDao;