/**
 * Created by LocNT on 7/29/15.
 */
var MD5 = require("MD5");
var https = require('https');
var StringDecoder = require('string_decoder').StringDecoder;
var multiparty = require('multiparty');

var shopDao = require("../daos/ShopDao");

var ResponseServerDto = require("../modelsDto/ResponseServerDto");
var Shop = require("../models/Shop");
var ShopType = require("../models/ShopType");
var ShopDistrict = require("../models/ShopDistrict");

var Constant = require("../helpers/Constant");
var message = require("../message/en");
var checkValidateUtil = require("../utils/CheckValidateUtil");
var serviceUtil = require("../utils/ServiceUtil");
var uploadFileHelper = require("../helpers/UploadFileHelper");

var saveShopTypeForShop = function(shopID, shopTypeIDList){
    var shopTypeModelList = [];
    for(var i = 0; i < shopTypeIDList.length; i++){
        var shopType = new ShopType();
        shopType.shopID = shopID;
        var id = isNaN(shopTypeIDList[i])? 0 : parseInt(shopTypeIDList[i]);
        if(id > 0){
            shopType.shopTypeChildID = id;
            var shopTypeAttrArray = [shopType.id, shopType.shopID, shopType.shopTypeChildID, shopType.createdDate];
            shopTypeModelList.push(shopTypeAttrArray);
        }
    }

    shopDao.addMultiShopType(shopTypeModelList).then(function (result) {
        console.log("add shop type for create shop success");
    }, function (err) {
        console.log("add shop type for create shop error");
    });
};

var saveDistrictForShop = function(shopID, districtIDList){
    var districtModelList = [];
    for(var i = 0; i < districtIDList.length; i++){
        var shopDistrict = new ShopDistrict;
        shopDistrict.shopID = shopID;
        var id = isNaN(districtIDList[i])? 0 : parseInt(districtIDList[i]);
        if(id > 0){
            shopDistrict.districtID = id;
            var districtAttrArray = [shopDistrict.id, shopDistrict.shopID, shopDistrict.districtID, shopDistrict.createdDate];
            districtModelList.push(districtAttrArray);
        }
    }

    shopDao.addMultiShopDistrict(districtModelList).then(function (result) {
        console.log("add district for create shop success");
    }, function (err) {
        console.log("add district for create shop error");
    });
}

var createShop = function(req, res){
    var responseObj = new ResponseServerDto();

    var accessTokenObj = req.accessTokenObj;
    var userID = accessTokenObj.userID;

    var name = req.body.name ? req.body.name : "";
    var shopTypeIds = req.body.shopTypeIds ? req.body.shopTypeIds : "";
    var districtIds = req.body.districtIds ? req.body.districtIds : "";

    if(checkValidateUtil.isEmptyFeild(name) || checkValidateUtil.isEmptyFeild(shopTypeIds) || checkValidateUtil.isEmptyFeild(districtIds)){
        responseObj.statusErrorCode = Constant.CODE_STATUS.SHOP.CREATE_SHOP_EMPTY_FIELD;
        responseObj.errorsObject = message.SHOP.CREATE_SHOP_EMPTY_FIELD;
        responseObj.errorsMessage = message.SHOP.CREATE_SHOP_EMPTY_FIELD.message;
        res.send(responseObj);
        return;
    }

    var shopTypeIdList = shopTypeIds.split(";");
    var districtIdList = districtIds.split(";");


    shopDao.checkShopNameOfUserExist(userID, name).then(function(data){
        if(data.length == 0){
            shopDao.getShopStatusByValue(Constant.SHOP_STATUS_VALUE.ACTIVE).then(function(status){
                var shopStatusID = 0;
                if(status.length > 0){
                    shopStatusID = status[0].userStatusID;
                }
                var shop = new Shop();
                shop.userID = userID;
                shop.shopName = name;
                shop.isActive = true;
                shop.shopStatusID = shopStatusID;

                shopDao.addNew(shop).then(function(result){
                    responseObj.statusErrorCode = Constant.CODE_STATUS.SUCCESS;
                    responseObj.results = result;
                    res.send(responseObj);

                    saveShopTypeForShop(result.insertId, shopTypeIdList);
                    saveDistrictForShop(result.insertId, districtIdList)
                },function(err){
                    responseObj.statusErrorCode = Constant.CODE_STATUS.DB_EXECUTE_ERROR;
                    responseObj.errorsObject = err;
                    responseObj.errorsMessage = message.DB_EXECUTE_ERROR.message;
                    res.send(responseObj);
                });
            },function(err){
                responseObj.statusErrorCode = Constant.CODE_STATUS.DB_EXECUTE_ERROR;
                responseObj.errorsObject = err;
                responseObj.errorsMessage = message.DB_EXECUTE_ERROR.message;
                res.send(responseObj);
            });
        }else{
            responseObj.statusErrorCode = Constant.CODE_STATUS.SHOP.CREATE_SHOP_NAME_OF_USER_EXIST;
            responseObj.errorsObject = message.SHOP.CREATE_SHOP_NAME_OF_USER_EXIST;
            responseObj.errorsMessage = message.SHOP.CREATE_SHOP_NAME_OF_USER_EXIST.message;
            res.send(responseObj);
        }
    }, function(err){
        responseObj.statusErrorCode = Constant.CODE_STATUS.DB_EXECUTE_ERROR;
        responseObj.errorsObject = err;
        responseObj.errorsMessage = message.DB_EXECUTE_ERROR.message;
        res.send(responseObj);
    });
};

/*Exports*/
module.exports = {
    createShop : createShop
}