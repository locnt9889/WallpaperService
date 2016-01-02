/**
 * Created by LocNT on 7/29/15.
 */
var https = require('https');

var imageDao = require("../daos/ImageDao");

var ResponseServerDto = require("../modelsDto/ResponseServerDto");

var Constant = require("../helpers/Constant");
var message = require("../message/en");
var checkValidateUtil = require("../utils/CheckValidateUtil");
var serviceUtil = require("../utils/ServiceUtil");

var findImage = function(req, res){
    var responseObj = new ResponseServerDto();

    var category = isNaN(req.query.category) || !req.query.category ? 0 : parseInt(req.query.category);
    var pageNum = isNaN(req.query.pageNum) || !req.query.pageNum ? 1 : parseInt(req.query.pageNum);
    var perPage = isNaN(req.query.perPage) || !req.query.perPage ? 10 : parseInt(req.query.perPage);
    var orderBy = req.query.orderBy ? req.query.orderBy : "id";
    var orderType = req.query.orderType ? req.query.orderType.toUpperCase() : "DESC";
    var name = req.query.name ? req.query.name : "";

    if(orderBy != Constant.TABLE_NAME_DB.IMAGE.NAME_FIELD_CATEGORY_ID && orderBy != Constant.TABLE_NAME_DB.IMAGE.NAME_FIELD_COUNT_VIEW
        && orderBy != Constant.TABLE_NAME_DB.IMAGE.NAME_FIELD_ID && orderBy != Constant.TABLE_NAME_DB.IMAGE.NAME_FIELD_NAME
        && orderBy != Constant.TABLE_NAME_DB.IMAGE.NAME_FIELD_COUNT_FAVORITE && orderBy != Constant.TABLE_NAME_DB.IMAGE.NAME_FIELD_COUNT_DOWNLOAD){
        responseObj.statusErrorCode = Constant.CODE_STATUS.IMAGE.SEARCH_IMAGE_ORDER_FIELD_INVALID;
        responseObj.errorsObject = message.IMAGE.SEARCH_IMAGE_ORDER_FIELD_INVALID;
        responseObj.errorsMessage = message.IMAGE.SEARCH_IMAGE_ORDER_FIELD_INVALID.message;
        res.send(responseObj);
        return;
    }

    if(orderType != Constant.ORDER_CONSTANT.ORDER_TYPE.ASC && orderType != Constant.ORDER_CONSTANT.ORDER_TYPE.DESC){
        responseObj.statusErrorCode = Constant.CODE_STATUS.IMAGE.SEARCH_IMAGE_ORDER_TYPE_INVALID;
        responseObj.errorsObject = message.IMAGE.SEARCH_IMAGE_ORDER_TYPE_INVALID;
        responseObj.errorsMessage = message.IMAGE.SEARCH_IMAGE_ORDER_TYPE_INVALID.message;
        res.send(responseObj);
        return;
    }

    imageDao.getImageList(category,name, pageNum, perPage, orderBy, orderType).then(function (data) {
        responseObj.statusErrorCode = Constant.CODE_STATUS.SUCCESS;
        responseObj.results = data;
        res.send(responseObj);
    }, function (err) {
        responseObj.statusErrorCode = Constant.CODE_STATUS.DB_EXECUTE_ERROR;
        responseObj.errorsObject = err;
        responseObj.errorsMessage = message.DB_EXECUTE_ERROR.message;
        res.send(responseObj);
    });
};

var executeIncrease = function(req, res){
    var responseObj = new ResponseServerDto();

    var id = isNaN(req.query.id) || !req.query.id ? 0 : parseInt(req.query.id);
    var type = req.query.type ? req.query.type : "";

    var name_field = "";

    if(id == 0){
        responseObj.statusErrorCode = Constant.CODE_STATUS.IMAGE.IMAGE_INVALID;
        responseObj.errorsObject = message.IMAGE.IMAGE_INVALID;
        responseObj.errorsMessage = message.IMAGE.IMAGE_INVALID.message;
        res.send(responseObj);
        return;
    }

    if(type == Constant.INCREASE_TYPE.VIEW){
        name_field = Constant.TABLE_NAME_DB.IMAGE.NAME_FIELD_COUNT_VIEW;
    }else if(type == Constant.INCREASE_TYPE.DOWNLOAD){
        name_field = Constant.TABLE_NAME_DB.IMAGE.NAME_FIELD_COUNT_DOWNLOAD;
    }else if(type == Constant.INCREASE_TYPE.FAVORITE){
        name_field = Constant.TABLE_NAME_DB.IMAGE.NAME_FIELD_COUNT_FAVORITE;
    }else{
        responseObj.statusErrorCode = Constant.CODE_STATUS.IMAGE.EXECUTE_TYPE_INVALID;
        responseObj.errorsObject = message.IMAGE.EXECUTE_TYPE_INVALID;
        responseObj.errorsMessage = message.IMAGE.EXECUTE_TYPE_INVALID.message;
        res.send(responseObj);
        return;
    }

    imageDao.executeIncrease(name_field, id).then(function (data) {
        responseObj.statusErrorCode = Constant.CODE_STATUS.SUCCESS;
        responseObj.results = data;
        res.send(responseObj);
    }, function (err) {
        responseObj.statusErrorCode = Constant.CODE_STATUS.DB_EXECUTE_ERROR;
        responseObj.errorsObject = err;
        responseObj.errorsMessage = message.DB_EXECUTE_ERROR.message;
        res.send(responseObj);
    });
};

/*Exports*/
module.exports = {
    findImage : findImage,
    executeIncrease : executeIncrease
}