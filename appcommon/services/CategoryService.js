/**
 * Created by LocNT on 7/29/15.
 */
var MD5 = require("MD5");
var https = require('https');
var StringDecoder = require('string_decoder').StringDecoder;
var multiparty = require('multiparty');

var UploadResponseDTO = require("../modelsDto/UploadResponseDTO");

var categoryDao = require("../daos/CategoryDao");
var shopDao = require("../daos/ShopDao");

var ResponseServerDto = require("../modelsDto/ResponseServerDto");
var Category = require("../models/Category");
var CategoryUpdateDto = require("../modelsDto/CategoryUpdateDto");

var Constant = require("../helpers/Constant");
var message = require("../message/en");
var checkValidateUtil = require("../utils/CheckValidateUtil");
var serviceUtil = require("../utils/ServiceUtil");
var uploadFileHelper = require("../helpers/UploadFileHelper");

var createCategory = function(req, res){
    var responseObj = new ResponseServerDto();

    var accessTokenObj = req.accessTokenObj;
    var userID = accessTokenObj.userID;

    var shopID = isNaN(req.body.shopID)? 0 : parseInt(req.body.shopID);

    if(shopID <= 0){
        responseObj.statusErrorCode = Constant.CODE_STATUS.SHOP.SHOP_INVALID;
        responseObj.errorsObject = message.SHOP.SHOP_INVALID;
        responseObj.errorsMessage = message.SHOP.SHOP_INVALID.message;
        res.send(responseObj);
        return;
    }

    var categoryName = req.body.categoryName? req.body.categoryName : "";
    var categoryDesc = req.body.categoryDesc? req.body.categoryDesc : "";

    if(checkValidateUtil.isEmptyFeild(categoryName)){
        responseObj.statusErrorCode = Constant.CODE_STATUS.CATEGORY.CREATE_CATEGORY_EMPTY_FIELD;
        responseObj.errorsObject = message.CATEGORY.CREATE_CATEGORY_EMPTY_FIELD;
        responseObj.errorsMessage = message.CATEGORY.CREATE_CATEGORY_EMPTY_FIELD.message;
        res.send(responseObj);
        return;
    }

    shopDao.findOneById(Constant.TABLE_NAME_DB.SHOP.NAME_FIELD_ID, shopID).then(function (data) {
        if(data.length == 0 ){
            responseObj.statusErrorCode = Constant.CODE_STATUS.SHOP.SHOP_INVALID;
            responseObj.errorsObject = message.SHOP.SHOP_INVALID;
            responseObj.errorsMessage = message.SHOP.SHOP_INVALID.message;
            res.send(responseObj);
            return;
        }else{
            if(data[0].userID != userID){
                responseObj.statusErrorCode = Constant.CODE_STATUS.SHOP.SHOP_UPDATE_USER_IS_DENIED;
                responseObj.errorsObject = message.SHOP.SHOP_UPDATE_USER_IS_DENIED;
                responseObj.errorsMessage = message.SHOP.SHOP_UPDATE_USER_IS_DENIED.message;
                res.send(responseObj);
                return;
            }else{
                categoryDao.checkCategoryNameOfShopExist(shopID, categoryName).then(function(data1){
                    if(data1.length == 0){
                        var category = new Category();
                        category.shopID = shopID;
                        category.categoryName = categoryName;
                        category.categoryDesc = categoryDesc;

                        categoryDao.addNew(category).then(function(result){
                            responseObj.statusErrorCode = Constant.CODE_STATUS.SUCCESS;
                            responseObj.results = result;
                            res.send(responseObj);

                        },function(err){
                            responseObj.statusErrorCode = Constant.CODE_STATUS.DB_EXECUTE_ERROR;
                            responseObj.errorsObject = err;
                            responseObj.errorsMessage = message.DB_EXECUTE_ERROR.message;
                            res.send(responseObj);
                        });
                    }else{
                        responseObj.statusErrorCode = Constant.CODE_STATUS.CATEGORY.CREATE_CATEGORY_NAME_OF_SHOP_EXIST;
                        responseObj.errorsObject = message.CATEGORY.CREATE_CATEGORY_NAME_OF_SHOP_EXIST;
                        responseObj.errorsMessage = message.CATEGORY.CREATE_CATEGORY_NAME_OF_SHOP_EXIST.message;
                        res.send(responseObj);
                    }
                }, function(err){
                    responseObj.statusErrorCode = Constant.CODE_STATUS.DB_EXECUTE_ERROR;
                    responseObj.errorsObject = err;
                    responseObj.errorsMessage = message.DB_EXECUTE_ERROR.message;
                    res.send(responseObj);
                });
            }
        }
    }, function (err) {
        responseObj.statusErrorCode = Constant.CODE_STATUS.DB_EXECUTE_ERROR;
        responseObj.errorsObject = err;
        responseObj.errorsMessage = message.DB_EXECUTE_ERROR.message;
        res.send(responseObj);
    });
};

var getCategoryDetail = function(req, res){
    var responseObj = new ResponseServerDto();

    var accessTokenObj = req.accessTokenObj;
    var userID = accessTokenObj.userID;

    var categoryID = isNaN(req.body.categoryID)? 0 : parseInt(req.body.categoryID);

    if(categoryID <= 0){
        responseObj.statusErrorCode = Constant.CODE_STATUS.CATEGORY.CATEGORY_INVALID;
        responseObj.errorsObject = message.CATEGORY.CATEGORY_INVALID;
        responseObj.errorsMessage = message.CATEGORY.CATEGORY_INVALID.message;
        res.send(responseObj);
        return;
    }

    categoryDao.findOneById(Constant.TABLE_NAME_DB.SHOP_CATEGORY.NAME_FIELD_ID, categoryID).then(function (data) {
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

var updateCategory = function(req, res){
    var responseObj = new ResponseServerDto();

    var accessTokenObj = req.accessTokenObj;
    var userID = accessTokenObj.userID;

    var categoryID = isNaN(req.body.categoryID)? 0 : parseInt(req.body.categoryID);

    var categoryName = req.body.categoryName? req.body.categoryName : "";
    var categoryDesc = req.body.categoryDesc? req.body.categoryDesc : "";

    if(checkValidateUtil.isEmptyFeild(categoryName)){
        responseObj.statusErrorCode = Constant.CODE_STATUS.CATEGORY.CREATE_CATEGORY_EMPTY_FIELD;
        responseObj.errorsObject = message.CATEGORY.CREATE_CATEGORY_EMPTY_FIELD;
        responseObj.errorsMessage = message.CATEGORY.CREATE_CATEGORY_EMPTY_FIELD.message;
        res.send(responseObj);
        return;
    }
    categoryDao.findOneById(Constant.TABLE_NAME_DB.SHOP_CATEGORY.NAME_FIELD_ID, categoryID).then(function (dataCategory) {
        if(dataCategory.length == 0){
            responseObj.statusErrorCode = Constant.CODE_STATUS.CATEGORY.CATEGORY_INVALID;
            responseObj.errorsObject = message.CATEGORY.CATEGORY_INVALID;
            responseObj.errorsMessage = message.CATEGORY.CATEGORY_INVALID.message;
            res.send(responseObj);
            return;
        }else {
            var shopID = dataCategory[0].shopID;

            shopDao.findOneById(Constant.TABLE_NAME_DB.SHOP.NAME_FIELD_ID, shopID).then(function (data) {
                if (data.length == 0) {
                    responseObj.statusErrorCode = Constant.CODE_STATUS.SHOP.SHOP_INVALID;
                    responseObj.errorsObject = message.SHOP.SHOP_INVALID;
                    responseObj.errorsMessage = message.SHOP.SHOP_INVALID.message;
                    res.send(responseObj);
                    return;
                } else {
                    if (data[0].userID != userID) {
                        responseObj.statusErrorCode = Constant.CODE_STATUS.SHOP.SHOP_UPDATE_USER_IS_DENIED;
                        responseObj.errorsObject = message.SHOP.SHOP_UPDATE_USER_IS_DENIED;
                        responseObj.errorsMessage = message.SHOP.SHOP_UPDATE_USER_IS_DENIED.message;
                        res.send(responseObj);
                        return;
                    } else {
                        categoryDao.checkCategoryNameOfShopExist(shopID, categoryName).then(function (data1) {
                            if (data1.length == 0) {
                                var categoryUpdate = new CategoryUpdateDto();
                                categoryUpdate.categoryName = categoryName;
                                categoryUpdate.categoryDesc = categoryDesc;

                                categoryDao.update(categoryUpdate, Constant.TABLE_NAME_DB.SHOP_CATEGORY.NAME_FIELD_ID, categoryID).then(function (result) {
                                    responseObj.statusErrorCode = Constant.CODE_STATUS.SUCCESS;
                                    responseObj.results = result;
                                    res.send(responseObj);
                                }, function (err) {
                                    responseObj.statusErrorCode = Constant.CODE_STATUS.DB_EXECUTE_ERROR;
                                    responseObj.errorsObject = err;
                                    responseObj.errorsMessage = message.DB_EXECUTE_ERROR.message;
                                    res.send(responseObj);
                                });
                            } else {
                                responseObj.statusErrorCode = Constant.CODE_STATUS.CATEGORY.CREATE_CATEGORY_NAME_OF_SHOP_EXIST;
                                responseObj.errorsObject = message.CATEGORY.CREATE_CATEGORY_NAME_OF_SHOP_EXIST;
                                responseObj.errorsMessage = message.CATEGORY.CREATE_CATEGORY_NAME_OF_SHOP_EXIST.message;
                                res.send(responseObj);
                            }
                        }, function (err) {
                            responseObj.statusErrorCode = Constant.CODE_STATUS.DB_EXECUTE_ERROR;
                            responseObj.errorsObject = err;
                            responseObj.errorsMessage = message.DB_EXECUTE_ERROR.message;
                            res.send(responseObj);
                        });
                    }
                }
            }, function (err) {
                responseObj.statusErrorCode = Constant.CODE_STATUS.DB_EXECUTE_ERROR;
                responseObj.errorsObject = err;
                responseObj.errorsMessage = message.DB_EXECUTE_ERROR.message;
                res.send(responseObj);
            });
        }
    }, function (err) {
        responseObj.statusErrorCode = Constant.CODE_STATUS.DB_EXECUTE_ERROR;
        responseObj.errorsObject = err;
        responseObj.errorsMessage = message.DB_EXECUTE_ERROR.message;
        res.send(responseObj);
    });
};

var deleteCategory = function(req, res){
    var responseObj = new ResponseServerDto();

    var accessTokenObj = req.accessTokenObj;
    var userID = accessTokenObj.userID;

    var categoryID = isNaN(req.body.categoryID)? 0 : parseInt(req.body.categoryID);

    categoryDao.findOneById(Constant.TABLE_NAME_DB.SHOP_CATEGORY.NAME_FIELD_ID, categoryID).then(function (dataCategory) {
        if(dataCategory.length == 0){
            responseObj.statusErrorCode = Constant.CODE_STATUS.CATEGORY.CATEGORY_INVALID;
            responseObj.errorsObject = message.CATEGORY.CATEGORY_INVALID;
            responseObj.errorsMessage = message.CATEGORY.CATEGORY_INVALID.message;
            res.send(responseObj);
            return;
        }else {
            var shopID = dataCategory[0].shopID;

            shopDao.findOneById(Constant.TABLE_NAME_DB.SHOP.NAME_FIELD_ID, shopID).then(function (data) {
                if (data.length == 0) {
                    responseObj.statusErrorCode = Constant.CODE_STATUS.SHOP.SHOP_INVALID;
                    responseObj.errorsObject = message.SHOP.SHOP_INVALID;
                    responseObj.errorsMessage = message.SHOP.SHOP_INVALID.message;
                    res.send(responseObj);
                    return;
                } else {
                    if (data[0].userID != userID) {
                        responseObj.statusErrorCode = Constant.CODE_STATUS.SHOP.SHOP_UPDATE_USER_IS_DENIED;
                        responseObj.errorsObject = message.SHOP.SHOP_UPDATE_USER_IS_DENIED;
                        responseObj.errorsMessage = message.SHOP.SHOP_UPDATE_USER_IS_DENIED.message;
                        res.send(responseObj);
                        return;
                    } else {
                        categoryDao.update({"isActive" : 0}, Constant.TABLE_NAME_DB.SHOP_CATEGORY.NAME_FIELD_ID, categoryID).then(function (result) {
                            responseObj.statusErrorCode = Constant.CODE_STATUS.SUCCESS;
                            responseObj.results = result;
                            res.send(responseObj);
                        }, function (err) {
                            responseObj.statusErrorCode = Constant.CODE_STATUS.DB_EXECUTE_ERROR;
                            responseObj.errorsObject = err;
                            responseObj.errorsMessage = message.DB_EXECUTE_ERROR.message;
                            res.send(responseObj);
                        });
                    }
                }
            }, function (err) {
                responseObj.statusErrorCode = Constant.CODE_STATUS.DB_EXECUTE_ERROR;
                responseObj.errorsObject = err;
                responseObj.errorsMessage = message.DB_EXECUTE_ERROR.message;
                res.send(responseObj);
            });
        }
    }, function (err) {
        responseObj.statusErrorCode = Constant.CODE_STATUS.DB_EXECUTE_ERROR;
        responseObj.errorsObject = err;
        responseObj.errorsMessage = message.DB_EXECUTE_ERROR.message;
        res.send(responseObj);
    });
};

/*Exports*/
module.exports = {
    createCategory : createCategory,
    getCategoryDetail : getCategoryDetail,
    updateCategory : updateCategory,
    deleteCategory : deleteCategory
}