/**
 * Created by LocNT on 7/30/15.
 */
var Q = require("q");
//var DbConfig = require("./DatabaseConfig");
//var pool = DbConfig.pool;
var SqlQueryConstant = require("../helpers/SqlQueryConstant");

var MysqlHelper = new require("../helpers/MysqlHelper");
var Constant = require("../helpers/Constant");
var userContactDao = new MysqlHelper(Constant.TABLE_NAME_DB.USER_CONTACTS.NAME);
var ResponsePagingDto = require("../modelsDto/ResponsePagingDto");

MysqlHelper.prototype.getUserContactStatusByValue = function(value){
    var sql = SqlQueryConstant.USER_CONTACT_SQL_SCRIPT.USER_CONTACT_STATUS_SCRIPT.GET_USER_STATUS_ID_BY_VALUE;
    var params = [value];
    return userContactDao.queryExecute(sql, params);
};

MysqlHelper.prototype.addMultiContact = function(array){
    var sql = SqlQueryConstant.USER_CONTACT_SQL_SCRIPT.SLQ_ADD_NEW_MULTI;
    var params = [array];
    return userContactDao.queryExecute(sql, params);
};

/*Export*/
module.exports = userContactDao;