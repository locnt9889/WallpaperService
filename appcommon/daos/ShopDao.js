/**
 * Created by LocNT on 7/30/15.
 */
var Q = require("q");
var SqlQueryConstant = require("../helpers/SqlQueryConstant");

var MysqlHelper = new require("../helpers/MysqlHelper");
var Constant = require("../helpers/Constant");
var shopDao = new MysqlHelper(Constant.TABLE_NAME_DB.SHOP.NAME);
var ResponsePagingDto = require("../modelsDto/ResponsePagingDto");

MysqlHelper.prototype.checkShopNameOfUserExist = function(userID, name){
    var sql = SqlQueryConstant.SHOP_SQL_SCRIPT.CHECK_SHOP_NAME_OF_USER_EXIST;
    var params = [userID, name];
    return shopDao.queryExecute(sql, params);
};

MysqlHelper.prototype.getShopStatusByValue = function(value){
    var sql = SqlQueryConstant.SHOP_SQL_SCRIPT.SHOP_STATUS_SCRIPT.GET_SHOP_STATUS_ID_BY_VALUE;
    var params = [value];
    return shopDao.queryExecute(sql, params);
};

MysqlHelper.prototype.addMultiShopType = function(array){
    var sql = SqlQueryConstant.SHOP_SQL_SCRIPT.SLQ_ADD_NEW_MULTI_SHOP_TYPE;
    var params = [array];
    return shopDao.queryExecute(sql, params);
};

MysqlHelper.prototype.addMultiShopDistrict = function(array){
    var sql = SqlQueryConstant.SHOP_SQL_SCRIPT.SLQ_ADD_NEW_MULTI_DISTRICT;
    var params = [array];
    return shopDao.queryExecute(sql, params);
};

/*Export*/
module.exports = shopDao;