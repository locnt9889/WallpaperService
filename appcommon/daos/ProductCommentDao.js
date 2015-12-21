/**
 * Created by LocNT on 7/30/15.
 */
var Q = require("q");
var SqlQueryConstant = require("../helpers/SqlQueryConstant");

var MysqlHelper = new require("../helpers/MysqlHelper");
var Constant = require("../helpers/Constant");
var productCommentDao = new MysqlHelper(Constant.TABLE_NAME_DB.SHOP_PRODUCT_COMMENTS.NAME);
var ResponsePagingDto = require("../modelsDto/ResponsePagingDto");

MysqlHelper.prototype.getCommentByProductID = function(productID, pageNum, perPage){
    var def = Q.defer();

    var start = perPage * (pageNum-1);

    var sqlCount = SqlQueryConstant.COMMENT_SQL_SCRIPT.COUNT_GET_COMMENT_BY_PRODUCT;
    var paramCount = [productID];
    productCommentDao.queryExecute(sqlCount, paramCount).then(function(data){
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

        var sql = SqlQueryConstant.COMMENT_SQL_SCRIPT.GET_COMMENT_BY_PRODUCT;
        var params = [productID, start, perPage];
        productCommentDao.queryExecute(sql, params).then(function(data1){
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

MysqlHelper.prototype.getCommentByParent = function(parentID, pageNum, perPage){
    var def = Q.defer();

    var start = perPage * (pageNum-1);

    var sqlCount = SqlQueryConstant.COMMENT_SQL_SCRIPT.COUNT_GET_COMMENT_BY_PARENT;
    var paramCount = [parentID];
    productCommentDao.queryExecute(sqlCount, paramCount).then(function(data){
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

        var sql = SqlQueryConstant.COMMENT_SQL_SCRIPT.GET_COMMENT_BY_PARENT;
        var params = [parentID, start, perPage];
        productCommentDao.queryExecute(sql, params).then(function(data1){
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
module.exports = productCommentDao;