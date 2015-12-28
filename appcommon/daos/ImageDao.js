/**
 * Created by LocNT on 7/30/15.
 */
var Q = require("q");
var SqlQueryConstant = require("../helpers/SqlQueryConstant");

var MysqlHelper = new require("../helpers/MysqlHelper");
var Constant = require("../helpers/Constant");
var imageDao = new MysqlHelper(Constant.TABLE_NAME_DB.IMAGE.NAME);
var ResponsePagingDto = require("../modelsDto/ResponsePagingDto");

var CATEGORY_PARAM_NAME = "#category";
var ORDERBY_PARAM_NAME = "#orderBy";
var ORDERTYPE_PARAM_NAME = "#orderType";
var LIKE_NAME_PARAM_NAME = "#name";

MysqlHelper.prototype.getImageList = function(category,name, pageNum, perPage, orderBy, orderType){
    var def = Q.defer();

    orderBy = orderBy ? orderBy : "id";
    orderType = orderType ? orderType : "DESC";
    category = category ? category : 0;
    name = name ? name : "";

    var start = perPage * (pageNum-1);

    //build sql
    var sqlCount = SqlQueryConstant.IMAGE_SQL_SCRIPT.COUNT_GET_LIST_IMAGE;
    var sql = SqlQueryConstant.IMAGE_SQL_SCRIPT.GET_LIST_IMAGE;

    if(category > 0){
        var cateString = Constant.TABLE_NAME_DB.IMAGE.NAME_FIELD_CATEGORY_ID + " = " + category;
        sqlCount = sqlCount.replace(CATEGORY_PARAM_NAME, cateString);
        sql = sql.replace(CATEGORY_PARAM_NAME, cateString);
    }else{
        sqlCount = sqlCount.replace(CATEGORY_PARAM_NAME, "1");
        sql = sql.replace(CATEGORY_PARAM_NAME, "1");
    }

    if(name != ""){
        var nameArray = name.trim().split(" ");
        var stringQuery = "";
        for(var i = 0; i < nameArray.length; i ++){
            stringQuery = stringQuery + " AND " + Constant.TABLE_NAME_DB.IMAGE.NAME_FIELD_NAME + " LIKE '%" + nameArray[i] + "%'";
        }
        sqlCount = sqlCount.replace(LIKE_NAME_PARAM_NAME, stringQuery);
        sql = sql.replace(LIKE_NAME_PARAM_NAME, stringQuery);
    }else{
        sqlCount = sqlCount.replace(LIKE_NAME_PARAM_NAME, "");
        sql = sql.replace(LIKE_NAME_PARAM_NAME, "");
    }

    sqlCount = sqlCount.replace(ORDERBY_PARAM_NAME, orderBy);
    sql = sql.replace(ORDERBY_PARAM_NAME, orderBy);

    sqlCount = sqlCount.replace(ORDERTYPE_PARAM_NAME, orderType);
    sql = sql.replace(ORDERTYPE_PARAM_NAME, orderType);

    var paramCount = [];

    imageDao.queryExecute(sqlCount, paramCount).then(function(data){
        var responsePagingDto = new ResponsePagingDto();
        var totalItems = data[0].totalItems;
        var totalPages = parseInt(totalItems / perPage);
        if((totalItems / perPage) > totalPages){
            totalPages = totalPages + 1;
        }

        responsePagingDto.pageNum = pageNum;
        responsePagingDto.perPage = perPage;
        responsePagingDto.totalItems = totalItems;
        responsePagingDto.totalPages = totalPages;

        var params = [start, perPage];
        imageDao.queryExecute(sql, params).then(function(data1){
            responsePagingDto.items = data1;

            def.resolve(responsePagingDto);
        }, function(err){
            def.reject(err);
        });
    }, function(err){
        def.reject(err);
    });

    return def.promise;
};

/*Export*/
module.exports = imageDao;