/**
 * Created by LocNT on 7/30/15.
 */
var Q = require("q");
//var DbConfig = require("./DatabaseConfig");
//var pool = DbConfig.pool;
var SqlQueryContant = require("../helpers/SqlQueryContant");

var MysqlHelper = new require("../helpers/MysqlHelper");
var Constant = require("../helpers/Contant");
var userDao = new MysqlHelper(Constant.TABLE_NAME_DB.USER);


MysqlHelper.prototype.test = function(){
    console.log("test");
}

MysqlHelper.prototype.checkEmailExist = function(email){
    var sql = SqlQueryContant.USER_SQL_SCRIPT.CHECK_EMAIL_EXIST;
    var params = [email];
    return userDao.queryExecute(sql, params);
};

MysqlHelper.prototype.getUserStatusNEW = function(){
    var sql = SqlQueryContant.USER_SQL_SCRIPT.USER_STATUS_SCRIPT.GET_USER_STATUS_ID_BY_VALUE;
    var params = [Constant.USER_STATUS_VALUE.NEW];
    return userDao.queryExecute(sql, params);
};

MysqlHelper.prototype.checkLogin = function(email, password){
    var sql = SqlQueryContant.USER_SQL_SCRIPT.CHECK_LOGIN;
    var params = [email, password];
    return userDao.queryExecute(sql, params);
};

MysqlHelper.prototype.findDeviceTokenByValue = function(deviceToken){
    var sql = SqlQueryContant.USER_SQL_SCRIPT.FIND_DEVICE_TOKEN_BY_VALUE;
    var params = [deviceToken];
    return userDao.queryExecute(sql, params);
};

MysqlHelper.prototype.changePassword = function(userID, newPasswordMD5){
    var sql = SqlQueryContant.USER_SQL_SCRIPT.SLQ_CHANGE_PASSWORD;
    var params = [newPasswordMD5, userID];
    return userDao.queryExecute(sql, params);
};

/*Export*/
module.exports = userDao;