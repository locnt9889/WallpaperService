/**
 * Created by LocNT on 7/29/15.
 */
var MD5 = require("MD5");
var https = require('https');
var StringDecoder = require('string_decoder').StringDecoder;
var multiparty = require('multiparty');

var userFavoriteDao = require("../daos/UserFavoriteDao");
var UserFavoriteItem = require("../models/UserFavoriteItem");

var ResponseServerDto = require("../modelsDto/ResponseServerDto");

var Constant = require("../helpers/Constant");
var message = require("../message/en");

var ACTION_VALUE = {
    ADD : "ADD",
    REMOVE : "REMOVE"
}

var TYPE_VALUE = {
    SHOP : "SHOP",
    PRODUCT : "PRODUCT",
    ALL : "ALL"
}

var executeFavorite = function(req, res){
    var responseObj = new ResponseServerDto();

    var accessTokenObj = req.accessTokenObj;
    var userID = accessTokenObj.userID;

    var favoriteType = req.body.favoriteType ? req.body.favoriteType : "";
    var favoriteItemID = isNaN(req.body.favoriteItemID) ? 0 : parseInt(req.body.favoriteItemID);
    var action = req.body.action ? req.body.action : "";

    if(action != ACTION_VALUE.ADD && action != ACTION_VALUE.REMOVE){
        responseObj.statusErrorCode = Constant.CODE_STATUS.USER_FAVORITE.EXECUTE_ERROR_ACTION;
        responseObj.errorsObject = message.USER_FAVORITE.EXECUTE_ERROR_ACTION;
        responseObj.errorsMessage = message.USER_FAVORITE.EXECUTE_ERROR_ACTION.message;
        res.send(responseObj);
        return;
    }

    if(favoriteType != TYPE_VALUE.SHOP && favoriteType != TYPE_VALUE.PRODUCT){
        responseObj.statusErrorCode = Constant.CODE_STATUS.USER_FAVORITE.EXECUTE_ERROR_TYPE_ITEM;
        responseObj.errorsObject = message.USER_FAVORITE.EXECUTE_ERROR_TYPE_ITEM;
        responseObj.errorsMessage = message.USER_FAVORITE.EXECUTE_ERROR_TYPE_ITEM.message;
        res.send(responseObj);
        return;
    }

    if(favoriteItemID <= 0 ){
        responseObj.statusErrorCode = Constant.CODE_STATUS.USER_FAVORITE.ITEM_INVALID;
        responseObj.errorsObject = message.USER_FAVORITE.ITEM_INVALID;
        responseObj.errorsMessage = message.USER_FAVORITE.ITEM_INVALID.message;
        res.send(responseObj);
        return;
    }

    userFavoriteDao.checkFavoriteUserAndItem(userID, favoriteItemID, favoriteType).then(function(data){
        if(data.length == 0){
            if(action == ACTION_VALUE.REMOVE){
                responseObj.statusErrorCode = Constant.CODE_STATUS.USER_FAVORITE.REMOVE_ITEM_NOT_EXISTED;
                responseObj.errorsObject = message.USER_FAVORITE.REMOVE_ITEM_NOT_EXISTED;
                responseObj.errorsMessage = message.USER_FAVORITE.REMOVE_ITEM_NOT_EXISTED.message;
                res.send(responseObj);
                return;
            }

            var userFavoriteItem = new UserFavoriteItem();

            userFavoriteItem.userID = userID;
            userFavoriteItem.favoriteItemID = favoriteItemID;
            userFavoriteItem.favoriteType = favoriteType;

            userFavoriteDao.addNew(userFavoriteItem).then(function(result){
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
            if(action == ACTION_VALUE.ADD){
                responseObj.statusErrorCode = Constant.CODE_STATUS.USER_FAVORITE.ADD_ITEM_EXISTED;
                responseObj.errorsObject = message.USER_FAVORITE.ADD_ITEM_EXISTED;
                responseObj.errorsMessage = message.USER_FAVORITE.ADD_ITEM_EXISTED.message;
                res.send(responseObj);
                return;
            }

            userFavoriteDao.remove(Constant.TABLE_NAME_DB.USER_FAVORITE_ITEMS.NAME_FIELD_ID, data[0].id).then(function(result){
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
    }, function(err){
        responseObj.statusErrorCode = Constant.CODE_STATUS.DB_EXECUTE_ERROR;
        responseObj.errorsObject = err;
        responseObj.errorsMessage = message.DB_EXECUTE_ERROR.message;
        res.send(responseObj);
    });
};

var checkItemIsFavorite = function(req, res){
    var responseObj = new ResponseServerDto();

    var accessTokenObj = req.accessTokenObj;
    var userID = accessTokenObj.userID;

    var favoriteType = req.body.favoriteType ? req.body.favoriteType : "";
    var favoriteItemID = isNaN(req.body.favoriteItemID) ? 0 : parseInt(req.body.favoriteItemID);

    if(favoriteType != TYPE_VALUE.SHOP && favoriteType != TYPE_VALUE.PRODUCT){
        responseObj.statusErrorCode = Constant.CODE_STATUS.USER_FAVORITE.EXECUTE_ERROR_TYPE_ITEM;
        responseObj.errorsObject = message.USER_FAVORITE.EXECUTE_ERROR_TYPE_ITEM;
        responseObj.errorsMessage = message.USER_FAVORITE.EXECUTE_ERROR_TYPE_ITEM.message;
        res.send(responseObj);
        return;
    }

    if(favoriteItemID < 0 ){
        responseObj.statusErrorCode = Constant.CODE_STATUS.USER_FAVORITE.ITEM_INVALID;
        responseObj.errorsObject = message.USER_FAVORITE.ITEM_INVALID;
        responseObj.errorsMessage = message.USER_FAVORITE.ITEM_INVALID.message;
        res.send(responseObj);
        return;
    }

    userFavoriteDao.checkFavoriteUserAndItem(userID, favoriteItemID, favoriteType).then(function(data){
        responseObj.statusErrorCode = Constant.CODE_STATUS.SUCCESS;
        responseObj.results = data;
        res.send(responseObj);
    }, function(err){
        responseObj.statusErrorCode = Constant.CODE_STATUS.DB_EXECUTE_ERROR;
        responseObj.errorsObject = err;
        responseObj.errorsMessage = message.DB_EXECUTE_ERROR.message;
        res.send(responseObj);
    });
};

var getListFavorite = function(req, res){
    var responseObj = new ResponseServerDto();

    var accessTokenObj = req.accessTokenObj;
    var userID = accessTokenObj.userID;

    var favoriteType = req.body.favoriteType ? req.body.favoriteType : "";
    var pageNum = isNaN(req.body.pageNum)? 1 : parseInt(req.body.pageNum);
    var perPage = isNaN(req.body.perPage)? 10 : parseInt(req.body.perPage);

    if(favoriteType != TYPE_VALUE.SHOP && favoriteType != TYPE_VALUE.PRODUCT && favoriteType != TYPE_VALUE.ALL){
        responseObj.statusErrorCode = Constant.CODE_STATUS.USER_FAVORITE.EXECUTE_ERROR_TYPE_ITEM;
        responseObj.errorsObject = message.USER_FAVORITE.EXECUTE_ERROR_TYPE_ITEM;
        responseObj.errorsMessage = message.USER_FAVORITE.EXECUTE_ERROR_TYPE_ITEM.message;
        res.send(responseObj);
        return;
    }

    userFavoriteDao.getListFavorite(userID, favoriteType, pageNum, perPage).then(function(data){
        responseObj.statusErrorCode = Constant.CODE_STATUS.SUCCESS;
        responseObj.results = data;
        res.send(responseObj);
    }, function(err){
        responseObj.statusErrorCode = Constant.CODE_STATUS.DB_EXECUTE_ERROR;
        responseObj.errorsObject = err;
        responseObj.errorsMessage = message.DB_EXECUTE_ERROR.message;
        res.send(responseObj);
    });
};

/*Exports*/
module.exports = {
    executeFavorite : executeFavorite,
    checkItemIsFavorite : checkItemIsFavorite,
    getListFavorite : getListFavorite
}