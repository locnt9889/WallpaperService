/**
 * Created by LocNT on 7/29/15.
 */
var MD5 = require("MD5");

//var MysqlHelperModule = require("../helpers/MysqlHelper");
var userDao = require("../daos/UserDao");
var User = require("../models/User");
var UserDeviceToken = require("../models/UserDeviceToken");
var UserAccessToken = require("../models/UserAccessToken");
var ResponseServerDto = require("../modelsDto/ResponseServerDto");
var UserLoginDto = require("../modelsDto/UserLoginDto");

var Constant = require("../helpers/Contant");
var message = require("../message/en");
var checkValidateUtil = require("../utils/CheckValidateUtil");
var serviceUtil = require("../utils/ServiceUtil");

var ID_FIELD_NAME = "id";

var registerByEmail = function(req, res){
    var responseObj = new ResponseServerDto();
    var email = req.body.email ? req.body.email : "";
    var password = req.body.password ? req.body.password : "";
    var fullname = req.body.fullname ? req.body.fullname : "";

    if(checkValidateUtil.isEmptyFeild(email) || checkValidateUtil.isEmptyFeild(password) || checkValidateUtil.isEmptyFeild(fullname)){
        responseObj.statusErrorCode = Constant.CODE_STATUS.USER_REGISTER_PARAMS_EMPTY;
        responseObj.errorsObject = message.USER_REGISTER.USER_REGISTER_PARAMS_EMPTY;
        responseObj.errorsMessage = message.USER_REGISTER.USER_REGISTER_PARAMS_EMPTY.message;
        res.send(responseObj);
        return;
    }

    if(!checkValidateUtil.checkValidateEmail(email)){
        responseObj.statusErrorCode = Constant.CODE_STATUS.USER_REGISTER_INVALID_EMAIL;
        responseObj.errorsObject = message.USER_REGISTER.USER_REGISTER_INVALID_EMAIL;
        responseObj.errorsMessage = message.USER_REGISTER.USER_REGISTER_INVALID_EMAIL.message;
        res.send(responseObj);
        return;
    }

    if(!checkValidateUtil.checkLengthPassword(password)){
        responseObj.statusErrorCode = Constant.CODE_STATUS.USER_REGISTER_ERROR_LENGTH_PASSWORD;
        responseObj.errorsObject = message.USER_REGISTER.USER_REGISTER_ERROR_LENGTH_PASSWORD;
        responseObj.errorsMessage = message.USER_REGISTER.USER_REGISTER_ERROR_LENGTH_PASSWORD.message;
        res.send(responseObj);
        return;
    }

    userDao.checkEmailExist(email).then(function(data){
        if(data.length == 0){
            userDao.getUserStatusNEW().then(function(status){
                var userStatusId = 0;
                if(status.length > 0){
                    userStatusId = status[0].userStatusID;
                }
                var user = new User();
                user.email = email;
                user.fullName = fullname;
                user.passWord = MD5(password);
                user.userStatusID = userStatusId;
                user.isActive = true;

                userDao.addNew(user).then(function(result){
                    responseObj.statusErrorCode = Constant.CODE_STATUS.SUCCESS;
                    responseObj.results = result;
                    res.send(responseObj);
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
            responseObj.statusErrorCode = Constant.CODE_STATUS.USER_EMAIL_EXISTED;
            responseObj.errorsObject = message.USER_REGISTER.USER_EMAIL_EXISTED;
            responseObj.errorsMessage = message.USER_REGISTER.USER_EMAIL_EXISTED.message;
            res.send(responseObj);
        }
    }, function(err){
        responseObj.statusErrorCode = Constant.CODE_STATUS.DB_EXECUTE_ERROR;
        responseObj.errorsObject = err;
        responseObj.errorsMessage = message.DB_EXECUTE_ERROR.message;
        res.send(responseObj);
    });
};

var addTokenAccess = function(userId, accessToken, deviceTokenID){
    var accessTokenObj = new UserAccessToken();
    accessTokenObj.userID = userId;
    accessTokenObj.accessTokenValue = accessToken;
    accessTokenObj.deviceTokenID = deviceTokenID;

    userDao.addNewCustom(Constant.TABLE_NAME_DB.USER_ACCESS_TOKEN, accessTokenObj).then(function(result){
        console.log("save user access token success : " + JSON.stringify(result));
    },function(err){
        console.log("save user access token error : " + JSON.stringify(err));
    });
};

var loginByEmail = function(req, res){
    var responseObj = new ResponseServerDto();

    var email = req.body.email ? req.body.email : "";
    var password = req.body.password ? req.body.password : "";
    var deviceToken = req.body.deviceToken ? req.body.deviceToken : "";

    if(checkValidateUtil.isEmptyFeild(deviceToken)){
        responseObj.statusErrorCode = Constant.CODE_STATUS.USER_REGISTER_PARAMS_EMPTY;
        responseObj.errorsObject = message.USER_REGISTER.USER_REGISTER_PARAMS_EMPTY;
        responseObj.errorsMessage = message.USER_REGISTER.USER_REGISTER_PARAMS_EMPTY.message;
        res.send(responseObj);
        return;
    }

    userDao.checkLogin(email, MD5(password)).then(function(data){
        if(data.length > 0){
            var userObj = data[0];
            if(userObj.isFacebookAccount){
                responseObj.statusErrorCode = Constant.CODE_STATUS.USER_LOGIN.USER_LOGIN_EMAIL_FB;
                responseObj.errorsObject = message.USER_LOGIN.USER_LOGIN_EMAIL_FB;
                responseObj.errorsMessage = message.USER_LOGIN.USER_LOGIN_EMAIL_FB.message;
                res.send(responseObj);
            }else{
                //generate accesstoken
                var accessToken = serviceUtil.generateAccessToken();
                console.log("accesstoken : " +  accessToken);

                var userLoginDto = new UserLoginDto();
                userObj.passWord = "******";
                userLoginDto.user = userObj;
                userLoginDto.accessToken = accessToken;

                responseObj.statusErrorCode = Constant.CODE_STATUS.SUCCESS;
                responseObj.results = userLoginDto;
                res.send(responseObj);

                //Save Device Token
                var userDeviceToken = new UserDeviceToken();
                userDeviceToken.deviceTokenValue = deviceToken;
                userDao.findDeviceTokenByValue(deviceToken).then(function(data){
                    var deviceTokenId = 0;
                    if(data.length ==0){
                        userDao.addNewCustom(Constant.TABLE_NAME_DB.USER_DEVICE_TOKEN, userDeviceToken).then(function(result){
                            console.log("save user device token success : " + JSON.stringify(result));
                            deviceTokenId = result.insertId;
                            addTokenAccess(userObj.userID, accessToken, deviceTokenId);
                        },function(err){
                            console.log("save user device token error : " + JSON.stringify(err));
                        });
                    }else{
                        deviceTokenId = data[0].deviceTokenID;
                        addTokenAccess(userObj.userID, accessToken, deviceTokenId);
                    }
                },function(err){
                    console.log("find user device token error : " + JSON.stringify(err));
                });
            }
        }else{
            responseObj.statusErrorCode = Constant.CODE_STATUS.USER_LOGIN.USER_LOGIN_INCORRECT;
            responseObj.errorsObject = message.USER_LOGIN.USER_LOGIN_INCORRECT;
            responseObj.errorsMessage = message.USER_LOGIN.USER_LOGIN_INCORRECT.message;
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
    registerByEmail : registerByEmail,
    loginByEmail : loginByEmail
}