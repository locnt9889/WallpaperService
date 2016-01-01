/**
 * Created by LocNT on 7/30/15.
 */
var Q = require("q");
var SqlQueryConstant = require("../helpers/SqlQueryConstant");

var MysqlHelper = new require("../helpers/MysqlHelper");
var Constant = require("../helpers/Constant");
var categoryDao = new MysqlHelper(Constant.TABLE_NAME_DB.CATEGORY.NAME);
var ResponsePagingDto = require("../modelsDto/ResponsePagingDto");

categoryDao.findAllWithNumberImage= function(shopID, name){
    var sql = SqlQueryConstant.CATEGORY_SQL_SCRIPT.FINDALL_WITH_NUMBER_IMAGE;
    var params = [shopID, name];
    return categoryDao.queryExecute(sql, params);
};

/*Export*/
module.exports = categoryDao;