/**
 * Created by LocNT on 7/29/15.
 */
var MD5 = require("MD5");
var https = require('https');
var StringDecoder = require('string_decoder').StringDecoder;
var multiparty = require('multiparty');

var shopTypeParentDao = require("../daos/ShopTypeParentDao");
var shopTypeChildDao = require("../daos/ShopTypeChildDao");

var ResponseServerDto = require("../modelsDto/ResponseServerDto");

var Constant = require("../helpers/Constant");
var message = require("../message/en");

var getAllShopTypeParent = function(req, res){
    var responseObj = new ResponseServerDto();
    var accessTokenObj = req.accessTokenObj;

    if(!accessTokenObj){
        responseObj.statusErrorCode = Constant.CODE_STATUS.ACCESS_TOKEN_INVALID;
        responseObj.errorsObject = message.ACCESS_TOKEN_INVALID;
        responseObj.errorsMessage = message.ACCESS_TOKEN_INVALID.message;
        res.send(responseObj);
    }else{
        shopTypeParentDao.findAllActive().then(function(data){
            responseObj.statusErrorCode = Constant.CODE_STATUS.SUCCESS;
            responseObj.results = data;
            res.send(responseObj);
        }, function(err){
            responseObj.statusErrorCode = Constant.CODE_STATUS.DB_EXECUTE_ERROR;
            responseObj.errorsObject = err;
            responseObj.errorsMessage = message.DB_EXECUTE_ERROR.message;
            res.send(responseObj);
        });
    }
};

var getAllShopTypeChildByParent = function(req, res){
    var responseObj = new ResponseServerDto();
    var accessTokenObj = req.accessTokenObj;

    if(!accessTokenObj){
        responseObj.statusErrorCode = Constant.CODE_STATUS.ACCESS_TOKEN_INVALID;
        responseObj.errorsObject = message.ACCESS_TOKEN_INVALID;
        responseObj.errorsMessage = message.ACCESS_TOKEN_INVALID.message;
        res.send(responseObj);
    }else{
        var parent_id = isNaN(req.body.parent_id)? 0 : parseInt(req.body.parent_id);

        shopTypeChildDao.findAllByFieldWithActive(Constant.TABLE_NAME_DB.SHOP_TYPE_CHILD.NAME_FIELD_PARENT_ID, parent_id).then(function(data){
            responseObj.statusErrorCode = Constant.CODE_STATUS.SUCCESS;
            responseObj.results = data;
            res.send(responseObj);
        }, function(err){
            responseObj.statusErrorCode = Constant.CODE_STATUS.DB_EXECUTE_ERROR;
            responseObj.errorsObject = err;
            responseObj.errorsMessage = message.DB_EXECUTE_ERROR.message;
            res.send(responseObj);
        });
    }
};

var getAllShopTypeData = function(req, res){
    var responseObj = new ResponseServerDto();
    var accessTokenObj = req.accessTokenObj;
    var shopType = {
        parents : [],
        childrent : []
    }

    if(!accessTokenObj){
        responseObj.statusErrorCode = Constant.CODE_STATUS.ACCESS_TOKEN_INVALID;
        responseObj.errorsObject = message.ACCESS_TOKEN_INVALID;
        responseObj.errorsMessage = message.ACCESS_TOKEN_INVALID.message;
        res.send(responseObj);
    }else{
        shopTypeParentDao.findAllActive().then(function(dataParent){
            shopType.parents = dataParent;

            shopTypeChildDao.findAllActive().then(function(data){
                responseObj.statusErrorCode = Constant.CODE_STATUS.SUCCESS;
                shopType.childrent = data;
                responseObj.results = shopType;
                res.send(responseObj);
            }, function(err){
                responseObj.statusErrorCode = Constant.CODE_STATUS.DB_EXECUTE_ERROR;
                responseObj.errorsObject = err;
                responseObj.errorsMessage = message.DB_EXECUTE_ERROR.message;
                res.send(responseObj);
            });
        }, function(err){
            responseObj.statusErrorCode = Constant.CODE_STATUS.DB_EXECUTE_ERROR;
            responseObj.errorsObject = err;
            responseObj.errorsMessage = message.DB_EXECUTE_ERROR.message;
            res.send(responseObj);
        });
    }
};

/*Exports*/
module.exports = {
    getAllShopTypeParent : getAllShopTypeParent,
    getAllShopTypeChildByParent : getAllShopTypeChildByParent,
    getAllShopTypeData : getAllShopTypeData
}