/**
 * Created by LocNT on 7/29/15.
 */
var MD5 = require("MD5");
var https = require('https');
var StringDecoder = require('string_decoder').StringDecoder;
var multiparty = require('multiparty');

//var MysqlHelperModule = require("../helpers/MysqlHelper");
var userContactDao = require("../daos/UserContactDao");
var userContactStatusDao = require("../daos/UserContactStatusDao");
var userDao = require("../daos/UserDao");

var ResponseServerDto = require("../modelsDto/ResponseServerDto");
var UserContact = require("../models/UserContact");

var Constant = require("../helpers/Constant");
var message = require("../message/en");
var checkValidateUtil = require("../utils/CheckValidateUtil");
var serviceUtil = require("../utils/ServiceUtil");
var uploadFileHelper = require("../helpers/UploadFileHelper");

var USER_ID_FIELD_NAME = Constant.TABLE_NAME_DB.USER.NAME_FIELD_ID;
var USER_CONTACT_ID_FIELD_NAME = Constant.TABLE_NAME_DB.USER_CONTACTS.NAME_FIELD_ID;

var requestAddFriend = function(req, res){
    var responseObj = new ResponseServerDto();
    var friendID = isNaN(req.body.friendID)? 0 : parseInt(req.body.friendID);

    var accessTokenObj = req.accessTokenObj;

    if(!accessTokenObj){
        responseObj.statusErrorCode = Constant.CODE_STATUS.ACCESS_TOKEN_INVALID;
        responseObj.errorsObject = message.ACCESS_TOKEN_INVALID;
        responseObj.errorsMessage = message.ACCESS_TOKEN_INVALID.message;
        res.send(responseObj);
    }else {
        var userID = accessTokenObj.userID;

        userDao.findOneById(USER_ID_FIELD_NAME, friendID).then(function(users){
            if(users.length == 0){
                responseObj.statusErrorCode = Constant.CODE_STATUS.USER_CONTACT.ERROR_USER_NOT_FOUND;
                responseObj.errorsObject = message.USER_CONTACT.ERROR_USER_NOT_FOUND;
                responseObj.errorsMessage = message.USER_CONTACT.ERROR_USER_NOT_FOUND.message;
                res.send(responseObj);
            }else{

                //add user contact for from user
                var userContactFrom = new UserContact();
                userContactFrom.userID = userID;
                userContactFrom.friendID = friendID;

                //add user contact for to user
                var userContactTo = new UserContact();
                userContactTo.userID = friendID;
                userContactTo.friendID = userID;

                userContactStatusDao.findAll().then(function (status) {
                    for(i = 0 ; i < status.length; i++){
                        if(status[i].statusValue == Constant.USER_CONTACT_STATUS_VALUE.REQUEST_MAKE_FRIEND){
                            userContactFrom.statusID = status[i].statusID;
                        }else if(status[i].statusValue == Constant.USER_CONTACT_STATUS_VALUE.WATTING_FOR_ACCEPT_REQUEST){
                            userContactTo.statusID = status[i].statusID;
                        }
                    }

                    var userContactFromArray = [userContactFrom.id, userContactFrom.userID, userContactFrom.friendID, userContactFrom.statusID, userContactFrom.createdDate, userContactFrom.modifiedDate];
                    var userContactToArray = [userContactTo.id, userContactTo.userID, userContactTo.friendID, userContactTo.statusID, userContactTo.createdDate, userContactTo.modifiedDate];

                    userContactDao.addMultiContact([userContactFromArray, userContactToArray]).then(function (result) {
                        responseObj.statusErrorCode = Constant.CODE_STATUS.SUCCESS;
                        responseObj.results = result;
                        res.send(responseObj);
                    }, function (err) {
                        responseObj.statusErrorCode = Constant.CODE_STATUS.DB_EXECUTE_ERROR;
                        responseObj.errorsObject = err;
                        responseObj.errorsMessage = message.DB_EXECUTE_ERROR.message;
                        res.send(responseObj);
                    });
                }, function (err) {
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

    }
};

/*Exports*/
module.exports = {
    requestAddFriend : requestAddFriend
}