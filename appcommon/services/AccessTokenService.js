/**
 * Created by LocNT on 7/30/15.
 */

var accessTokenDao = new require("../daos/AccessTokenDao");
var ResponseServerDto = require("../modelsDto/ResponseServerDto");
var Constant = require("../helpers/Contant");
var message = require("../message/en");
var checkValidateUtil = require("../utils/CheckValidateUtil");

var checkAccessToken = function(req, res, next){
    var accessToken = req.body.accessToken;
    var responseObj = new ResponseServerDto();

    if(checkValidateUtil.isEmptyFeild(accessToken)){
        responseObj.statusErrorCode = Constant.CODE_STATUS.ACCESS_TOKEN_INVALID;
        responseObj.errorsObject = message.ACCESS_TOKEN_INVALID;
        responseObj.errorsMessage = message.ACCESS_TOKEN_INVALID.message;
        res.send(responseObj);
        return;
    }

    accessTokenDao.checkAccessToken(accessToken).then(function(data){
        console.log("access token correct");
        if(data.length > 0){
            var accessTokenObj = data[0];
            accessTokenObj.passWord = "******";
            req.accessTokenObj = accessTokenObj;
            next();
        }else{
            responseObj.statusErrorCode = Constant.CODE_STATUS.ACCESS_TOKEN_INVALID;
            responseObj.errorsObject = message.ACCESS_TOKEN_INVALID;
            responseObj.errorsMessage = message.ACCESS_TOKEN_INVALID.message;
            res.send(responseObj);
        }
    }, function(err){
        responseObj.statusErrorCode = Constant.CODE_STATUS.DB_EXECUTE_ERROR;
        responseObj.errorsObject = err;
        responseObj.errorsMessage = message.DB_EXECUTE_ERROR.message;
        res.send(responseObj);
    });
};

module.exports = {
    checkAccessToken : checkAccessToken
}