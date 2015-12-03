/**
 * Created by LocNT on 7/29/15.
 */
var MD5 = require("MD5");
var https = require('https');
var StringDecoder = require('string_decoder').StringDecoder;
var multiparty = require('multiparty');

var UploadResponseDTO = require("../modelsDto/UploadResponseDTO");

var shopAddressDao = require("../daos/ShopAddressDao");
var shopDao = require("../daos/ShopDao");

var ResponseServerDto = require("../modelsDto/ResponseServerDto");
var ShopAddress = require("../models/ShopAddress");
var ShopAddressUpdateDto = require('../modelsDto/ShopAddressUpdateDto');

var Constant = require("../helpers/Constant");
var message = require("../message/en");
var checkValidateUtil = require("../utils/CheckValidateUtil");
var serviceUtil = require("../utils/ServiceUtil");
var uploadFileHelper = require("../helpers/UploadFileHelper");

var createAddress = function(req, res){
    var responseObj = new ResponseServerDto();

    var accessTokenObj = req.accessTokenObj;
    var userID = accessTokenObj.userID;

    var shopID = isNaN(req.body.shopID)? 0 : parseInt(req.body.shopID);

    var street = req.body.street ? req.body.street : "";
    var phone = req.body.phone ? req.body.phone : "";
    var isMap = req.body.isMap ? req.body.isMap : false;
    var longtitude = req.body.longtitude ? req.body.longtitude : 0.0;
    var latitude = req.body.latitude ? req.body.latitude : 0.0;

    if(shopID <= 0){
        responseObj.statusErrorCode = Constant.CODE_STATUS.SHOP.SHOP_INVALID;
        responseObj.errorsObject = message.SHOP.SHOP_INVALID;
        responseObj.errorsMessage = message.SHOP.SHOP_INVALID.message;
        res.send(responseObj);
        return;
    }

    if(checkValidateUtil.isEmptyFeild(street)){
        responseObj.statusErrorCode = Constant.CODE_STATUS.ADDRESS.CREATE_SHOP_ADDRESS_EMPTY_FIELD;
        responseObj.errorsObject = message.ADDRESS.CREATE_SHOP_ADDRESS_EMPTY_FIELD;
        responseObj.errorsMessage = message.ADDRESS.CREATE_SHOP_ADDRESS_EMPTY_FIELD.message;
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
                var shopAddress = new ShopAddress();
                shopAddress.shopID = shopID;
                shopAddress.isMap = isMap;
                shopAddress.latitude = latitude;
                shopAddress.longtitude = longtitude;
                shopAddress.street = street;
                shopAddress.phone = phone;

                shopAddressDao.addNew(shopAddress).then(function(result){
                    responseObj.statusErrorCode = Constant.CODE_STATUS.SUCCESS;
                    responseObj.results = result;
                    res.send(responseObj);

                },function(err){
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

var getAddressByShop = function(req, res){
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

    shopDao.findOneById(Constant.TABLE_NAME_DB.SHOP.NAME_FIELD_ID, shopID).then(function (data) {
        if(data.length == 0 ){
            responseObj.statusErrorCode = Constant.CODE_STATUS.SHOP.SHOP_INVALID;
            responseObj.errorsObject = message.SHOP.SHOP_INVALID;
            responseObj.errorsMessage = message.SHOP.SHOP_INVALID.message;
            res.send(responseObj);
            return;
        }else{

            shopAddressDao.getAddressByShop(shopID).then(function(data1){
                responseObj.statusErrorCode = Constant.CODE_STATUS.SUCCESS;
                responseObj.results = data1;
                res.send(responseObj);
            }, function(err){
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

var getAddressDetail = function(req, res){
    var responseObj = new ResponseServerDto();

    var accessTokenObj = req.accessTokenObj;
    var userID = accessTokenObj.userID;

    var id = isNaN(req.body.id)? 0 : parseInt(req.body.id);

    if(id <= 0){
        responseObj.statusErrorCode = Constant.CODE_STATUS.ADDRESS.SHOP_ADDRESS_INVALID;
        responseObj.errorsObject = message.ADDRESS.SHOP_ADDRESS_INVALID;
        responseObj.errorsMessage = message.ADDRESS.SHOP_ADDRESS_INVALID.message;
        res.send(responseObj);
        return;
    }

    shopAddressDao.findOneById(Constant.TABLE_NAME_DB.SHOP_ADDRESS.NAME_FIELD_ID, id).then(function (data) {
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

var deleteAddress = function(req, res){
    var responseObj = new ResponseServerDto();

    var accessTokenObj = req.accessTokenObj;
    var userID = accessTokenObj.userID;

    var id = isNaN(req.body.id)? 0 : parseInt(req.body.id);

    shopAddressDao.findOneById(Constant.TABLE_NAME_DB.SHOP_ADDRESS.NAME_FIELD_ID, id).then(function (dataAddress) {
        if(dataAddress.length == 0){
            responseObj.statusErrorCode = Constant.CODE_STATUS.ADDRESS.SHOP_ADDRESS_INVALID;
            responseObj.errorsObject = message.ADDRESS.SHOP_ADDRESS_INVALID;
            responseObj.errorsMessage = message.ADDRESS.SHOP_ADDRESS_INVALID.message;
            res.send(responseObj);
            return;
        }else {
            var shopID = dataAddress[0].shopID;

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
                        shopAddressDao.update({"isActive" : 0}, Constant.TABLE_NAME_DB.SHOP_ADDRESS.NAME_FIELD_ID, id).then(function (result) {
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

var updateAddress = function(req, res){
    var responseObj = new ResponseServerDto();

    var accessTokenObj = req.accessTokenObj;
    var userID = accessTokenObj.userID;

    var id = isNaN(req.body.id)? 0 : parseInt(req.body.id);

    var street = req.body.street ? req.body.street : "";
    var phone = req.body.phone ? req.body.phone : "";
    var isMap = req.body.isMap ? req.body.isMap : false;
    var longtitude = req.body.longtitude ? req.body.longtitude : 0.0;
    var latitude = req.body.latitude ? req.body.latitude : 0.0;

    shopAddressDao.findOneById(Constant.TABLE_NAME_DB.SHOP_ADDRESS.NAME_FIELD_ID, id).then(function (dataAddress) {
        if(dataAddress.length == 0){
            responseObj.statusErrorCode = Constant.CODE_STATUS.CATEGORY.CATEGORY_INVALID;
            responseObj.errorsObject = message.CATEGORY.CATEGORY_INVALID;
            responseObj.errorsMessage = message.CATEGORY.CATEGORY_INVALID.message;
            res.send(responseObj);
            return;
        }else {
            var shopID = dataAddress[0].shopID;

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

                        var shopAddressUpdateDto = new ShopAddressUpdateDto();
                        shopAddressUpdateDto.shopID = shopID;
                        shopAddressUpdateDto.isMap = isMap;
                        shopAddressUpdateDto.latitude = latitude;
                        shopAddressUpdateDto.longtitude = longtitude;
                        shopAddressUpdateDto.street = street;
                        shopAddressUpdateDto.phone = phone;

                        shopAddressDao.update(shopAddressUpdateDto, Constant.TABLE_NAME_DB.SHOP_ADDRESS.NAME_FIELD_ID, id).then(function (result) {
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
    createAddress : createAddress,
    getAddressByShop : getAddressByShop,
    getAddressDetail : getAddressDetail,
    deleteAddress : deleteAddress,
    updateAddress : updateAddress
}