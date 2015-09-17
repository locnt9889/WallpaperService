/**
 * Created by LocNT on 7/30/15.
 */
var Q = require("q");
var SqlQueryConstant = require("../helpers/SqlQueryConstant");

var MysqlHelper = new require("../helpers/MysqlHelper");
var Constant = require("../helpers/Constant");
var shopTypeParentDao = new MysqlHelper(Constant.TABLE_NAME_DB.SHOP_TYPE_PARENT.NAME);
var ResponsePagingDto = require("../modelsDto/ResponsePagingDto");

/*Export*/
module.exports = shopTypeParentDao;