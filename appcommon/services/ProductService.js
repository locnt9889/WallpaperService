/**
 * Created by LocNT on 7/29/15.
 */
var MD5 = require("MD5");
var https = require('https');
var StringDecoder = require('string_decoder').StringDecoder;
var multiparty = require('multiparty');

var UploadResponseDTO = require("../modelsDto/UploadResponseDTO");

var productDao = require("../daos/ProductDao");
var categoryDao = require("../daos/CategoryDao");

var ResponseServerDto = require("../modelsDto/ResponseServerDto");
var Product = require("../models/Product");
var ProductUpdateDto = require("../modelsDto/ProductUpdateDto");

var Constant = require("../helpers/Constant");
var message = require("../message/en");
var checkValidateUtil = require("../utils/CheckValidateUtil");
var serviceUtil = require("../utils/ServiceUtil");
var uploadFileHelper = require("../helpers/UploadFileHelper");

/**
 * Check Permission update Category of user
 * @Param : productID
 * @Param : userID (get from accessToken)
 * */
var checkPermissionUserAndCategory = function(req, res, next) {
    var responseObj = new ResponseServerDto();

    var accessTokenObj = req.accessTokenObj;
    var userID = accessTokenObj.userID;

    var productID = isNaN(req.body.productID)? 0 : parseInt(req.body.productID);

    if(productID <= 0){
        responseObj.statusErrorCode = Constant.CODE_STATUS.SHOP.SHOP_INVALID;
        responseObj.errorsObject = message.SHOP.SHOP_INVALID;
        responseObj.errorsMessage = message.SHOP.SHOP_INVALID.message;
        res.send(responseObj);
        return;
    }

    productDao.findOneById(Constant.TABLE_NAME_DB.SHOP_PRODUCT.NAME_FIELD_ID, productID).then(function (resultProduct) {
        if(resultProduct.length == 0){
            responseObj.statusErrorCode = Constant.CODE_STATUS.SHOP.SHOP_INVALID;
            responseObj.errorsObject = message.SHOP.SHOP_INVALID;
            responseObj.errorsMessage = message.SHOP.SHOP_INVALID.message;
            res.send(responseObj);
            return;
        }else {
            var categoryID = resultProduct[0].categoryID;

            //check permission update category
            categoryDao.checkPermissionUserAndCategory(userID, categoryID).then(function(data){
                if(data.length > 0){
                    res.categoryID = categoryID;
                    next();
                }else{
                    responseObj.statusErrorCode = Constant.CODE_STATUS.CATEGORY.CATEGORY_UPDATE_USER_IS_DENIED;
                    responseObj.errorsObject = message.CATEGORY.CATEGORY_UPDATE_USER_IS_DENIED;
                    responseObj.errorsMessage = message.CATEGORY.CATEGORY_UPDATE_USER_IS_DENIED.message;
                    res.send(responseObj);
                }
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




var createProduct = function(req, res){
    var responseObj = new ResponseServerDto();

    var accessTokenObj = req.accessTokenObj;
    var userID = accessTokenObj.userID;

    var productName = req.body.productName ? req.body.productName : "";
    var productCode = req.body.productCode ? req.body.productCode : "";
    var isShow = req.body.isShow ? req.body.isShow : false;
    var count = req.body.count ? req.body.count : 0;
    var price = req.body.price ? req.body.price : 0.0;
    var isSale = req.body.isSale ? req.body.isSale : false;
    var salePrice = req.body.salePrice ? req.body.salePrice : 0.0;
    var dateStartSale = req.body.dateStartSale ? req.body.dateStartSale : "0000-00-00 00:00:00";
    var dateEndSale = req.body.dateEndSale ? req.body.dateEndSale : "0000-00-00 00:00:00";

    var categoryID = isNaN(req.body.categoryID)? 0 : parseInt(req.body.categoryID);

    if(checkValidateUtil.isEmptyFeild(productName)){
        responseObj.statusErrorCode = Constant.CODE_STATUS.PRODUCT.CREATE_PRODUCT_EMPTY_FIELD;
        responseObj.errorsObject = message.PRODUCT.CREATE_PRODUCT_EMPTY_FIELD;
        responseObj.errorsMessage = message.PRODUCT.CREATE_PRODUCT_EMPTY_FIELD.message;
        res.send(responseObj);
        return;
    }

    if(categoryID <= 0){
        responseObj.statusErrorCode = Constant.CODE_STATUS.CATEGORY.CATEGORY_INVALID;
        responseObj.errorsObject = message.CODE_STATUS.CATEGORY.CATEGORY_INVALID;
        responseObj.errorsMessage = message.CODE_STATUS.CATEGORY.CATEGORY_INVALID.message;
        res.send(responseObj);
        return;
    }
    productDao.checkProductNameOfCategoryExist(categoryID, productName).then(function(data){
        if(data.length == 0){
            categoryDao.checkPermissionUserAndCategory(userID, categoryID).then(function(data){
                if(data.length > 0){
                    var product = new Product();

                    product.categoryID = categoryID;
                    product.count = count;
                    product.dateEndSale = dateEndSale;
                    product.dateStartSale = dateStartSale;
                    product.isSale = isSale;
                    product.isShow = isShow;
                    product.price = price;
                    product.productCode = productCode;
                    product.productName = productName;
                    product.salePrice = salePrice;

                    productDao.addNew(product).then(function(result){
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
                    responseObj.statusErrorCode = Constant.CODE_STATUS.CATEGORY.CATEGORY_UPDATE_USER_IS_DENIED;
                    responseObj.errorsObject = message.CATEGORY.CATEGORY_UPDATE_USER_IS_DENIED;
                    responseObj.errorsMessage = message.CATEGORY.CATEGORY_UPDATE_USER_IS_DENIED.message;
                    res.send(responseObj);
                }
            }, function(err){
                responseObj.statusErrorCode = Constant.CODE_STATUS.DB_EXECUTE_ERROR;
                responseObj.errorsObject = err;
                responseObj.errorsMessage = message.DB_EXECUTE_ERROR.message;
                res.send(responseObj);
            });
        }else{
            responseObj.statusErrorCode = Constant.CODE_STATUS.PRODUCT.CREATE_PRODUCT_NAME_OF_CATEGORY_EXIST;
            responseObj.errorsObject = message.PRODUCT.CREATE_PRODUCT_NAME_OF_CATEGORY_EXIST;
            responseObj.errorsMessage = message.PRODUCT.CREATE_PRODUCT_NAME_OF_CATEGORY_EXIST.message;
            res.send(responseObj);
        }
    }, function(err){
        responseObj.statusErrorCode = Constant.CODE_STATUS.DB_EXECUTE_ERROR;
        responseObj.errorsObject = err;
        responseObj.errorsMessage = message.DB_EXECUTE_ERROR.message;
        res.send(responseObj);
    });
};

/*
* Get production detail
* */
var getProductDetail = function(req, res) {
    var responseObj = new ResponseServerDto();

    var accessTokenObj = req.accessTokenObj;

    var productID = isNaN(req.body.productID)? 0 : parseInt(req.body.productID);

    if(productID <= 0){
        responseObj.statusErrorCode = Constant.CODE_STATUS.PRODUCT.PRODUCT_INVALID;
        responseObj.errorsObject = message.PRODUCT.PRODUCT_INVALID;
        responseObj.errorsMessage = message.PRODUCT.PRODUCT_INVALID.message;
        res.send(responseObj);
        return;
    }

    productDao.findOneById(Constant.TABLE_NAME_DB.SHOP_PRODUCT.NAME_FIELD_ID, productID).then(function (result) {
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

/*
* get product by category
* */
var getProductByCategory = function(req, res){
    var responseObj = new ResponseServerDto();
    var accessTokenObj = req.accessTokenObj;

    if(!accessTokenObj){
        responseObj.statusErrorCode = Constant.CODE_STATUS.ACCESS_TOKEN_INVALID;
        responseObj.errorsObject = message.ACCESS_TOKEN_INVALID;
        responseObj.errorsMessage = message.ACCESS_TOKEN_INVALID.message;
        res.send(responseObj);
    }else{
        var categoryID = isNaN(req.body.categoryID)? 0 : parseInt(req.body.categoryID);

        if(categoryID <= 0){
            responseObj.statusErrorCode = Constant.CODE_STATUS.CATEGORY.CATEGORY_INVALID;
            responseObj.errorsObject = message.CATEGORY.CATEGORY_INVALID;
            responseObj.errorsMessage = message.CATEGORY.CATEGORY_INVALID.message;
            res.send(responseObj);
            return;
        }

        var pageNum = isNaN(req.body.pageNum)? 1 : parseInt(req.body.pageNum);
        var perPage = isNaN(req.body.perPage)? 10 : parseInt(req.body.perPage);

        productDao.getProductByCategory(categoryID, pageNum, perPage).then(function(data){
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

/*
* delete product
* @Prepare : checkPermissionUserAndCategory
* */
var deleteProduct = function(req, res) {
    var responseObj = new ResponseServerDto();

    var accessTokenObj = req.accessTokenObj;
    var userID = accessTokenObj.userID;

    var productID = isNaN(req.body.productID)? 0 : parseInt(req.body.productID);

    productDao.update({"isActive" : 0}, Constant.TABLE_NAME_DB.SHOP_PRODUCT.NAME_FIELD_ID, productID).then(function (result) {
        responseObj.statusErrorCode = Constant.CODE_STATUS.SUCCESS;
        responseObj.results = result;
        res.send(responseObj);
    }, function (err) {
        responseObj.statusErrorCode = Constant.CODE_STATUS.DB_EXECUTE_ERROR;
        responseObj.errorsObject = err;
        responseObj.errorsMessage = message.DB_EXECUTE_ERROR.message;
        res.send(responseObj);
    });

};

/*
* update product
* @Prepare : checkPermissionUserAndCategory
* */
var updateProduct = function(req, res) {
    var responseObj = new ResponseServerDto();

    var accessTokenObj = req.accessTokenObj;

    var productName = req.body.productName ? req.body.productName : "";
    var productCode = req.body.productCode ? req.body.productCode : "";
    var isShow = req.body.isShow ? req.body.isShow : false;
    var count = req.body.count ? req.body.count : 0;
    var price = req.body.price ? req.body.price : 0.0;
    var isSale = req.body.isSale ? req.body.isSale : false;
    var salePrice = req.body.salePrice ? req.body.salePrice : 0.0;
    var dateStartSale = req.body.dateStartSale ? req.body.dateStartSale : "0000-00-00 00:00:00";
    var dateEndSale = req.body.dateEndSale ? req.body.dateEndSale : "0000-00-00 00:00:00";
    var productProperties = req.body.productProperties ? req.body.productProperties : "";
    var productID = isNaN(req.body.productID)? 0 : parseInt(req.body.productID);
    var categoryID = res.categoryID;

    if(checkValidateUtil.isEmptyFeild(productName)){
        responseObj.statusErrorCode = Constant.CODE_STATUS.PRODUCT.CREATE_PRODUCT_EMPTY_FIELD;
        responseObj.errorsObject = message.PRODUCT.CREATE_PRODUCT_EMPTY_FIELD;
        responseObj.errorsMessage = message.PRODUCT.CREATE_PRODUCT_EMPTY_FIELD.message;
        res.send(responseObj);
        return;
    }

    productDao.checkProductNameOfCategoryExist(categoryID, productName).then(function(data){
        if(data.length == 0){
            var product = new ProductUpdateDto();

            product.count = count;
            product.dateEndSale = dateEndSale;
            product.dateStartSale = dateStartSale;
            product.isSale = isSale;
            product.isShow = isShow;
            product.price = price;
            product.productCode = productCode;
            product.productName = productName;
            product.salePrice = salePrice;
            product.productProperties = productProperties;

            productDao.update(product, Constant.TABLE_NAME_DB.SHOP_PRODUCT.NAME_FIELD_ID, productID).then(function(result){
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
            responseObj.statusErrorCode = Constant.CODE_STATUS.PRODUCT.CREATE_PRODUCT_NAME_OF_CATEGORY_EXIST;
            responseObj.errorsObject = message.PRODUCT.CREATE_PRODUCT_NAME_OF_CATEGORY_EXIST;
            responseObj.errorsMessage = message.PRODUCT.CREATE_PRODUCT_NAME_OF_CATEGORY_EXIST.message;
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
    checkPermissionUserAndCategory : checkPermissionUserAndCategory,
    createProduct : createProduct,
    getProductDetail : getProductDetail,
    getProductByCategory : getProductByCategory,
    deleteProduct : deleteProduct,
    updateProduct : updateProduct
}