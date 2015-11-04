/**
 * Created by LocNT on 7/30/15.
 */
var Q = require("q");
var SqlQueryConstant = require("../helpers/SqlQueryConstant");

var MysqlHelper = new require("../helpers/MysqlHelper");
var Constant = require("../helpers/Constant");
var productDao = new MysqlHelper(Constant.TABLE_NAME_DB.SHOP_PRODUCT.NAME);
var ResponsePagingDto = require("../modelsDto/ResponsePagingDto");

MysqlHelper.prototype.checkProductNameOfCategoryExist = function(categoryID, name){
    var sql = SqlQueryConstant.PRODUCT_SQL_SCRIPT.CHECK_PRODUCT_NAME_OF_CATEGORY_EXIST;
    var params = [categoryID, name];
    return productDao.queryExecute(sql, params);
};

/*Export*/
module.exports = productDao;