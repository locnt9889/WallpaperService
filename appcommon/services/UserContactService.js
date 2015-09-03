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

var acceptFriend = function(req, res){
    var responseObj = new ResponseServerDto();
    var friendID = isNaN(req.body.friendID)? 0 : parseInt(req.body.friendID);
    var key = req.body.key ? req.body.key : "";

    var accessTokenObj = req.accessTokenObj;

    if(!accessTokenObj){
        responseObj.statusErrorCode = Constant.CODE_STATUS.ACCESS_TOKEN_INVALID;
        responseObj.errorsObject = message.ACCESS_TOKEN_INVALID;
        responseObj.errorsMessage = message.ACCESS_TOKEN_INVALID.message;
        res.send(responseObj);
    }else {

        if(checkValidateUtil.isEmptyFeild(key)){
            responseObj.statusErrorCode = Constant.CODE_STATUS.USER_CONTACT.ERROR_ACCEPT_FRIEND_KEY_EMPTY;
            responseObj.errorsObject = message.USER_CONTACT.ERROR_ACCEPT_FRIEND_KEY_EMPTY;
            responseObj.errorsMessage = message.USER_CONTACT.ERROR_ACCEPT_FRIEND_KEY_EMPTY.message;
            res.send(responseObj);
            return;
        }

        if(key != Constant.USER_CONTACT_PARAM_KEY.ACCEPT && key != Constant.USER_CONTACT_PARAM_KEY.BLOCK && key != Constant.USER_CONTACT_PARAM_KEY.DENY){
            responseObj.statusErrorCode = Constant.CODE_STATUS.USER_CONTACT.ERROR_ACCEPT_FRIEND_KEY_INVALID;
            responseObj.errorsObject = message.USER_CONTACT.ERROR_ACCEPT_FRIEND_KEY_INVALID;
            responseObj.errorsMessage = message.USER_CONTACT.ERROR_ACCEPT_FRIEND_KEY_INVALID.message;
            res.send(responseObj);
            return;
        }

        var userID = accessTokenObj.userID;

        userContactDao.findByUserAndFriend(userID, friendID).then(function(userContacts){
            if(userContacts.length == 0){
                responseObj.statusErrorCode = Constant.CODE_STATUS.USER_CONTACT.ERROR_HAVE_NO_REQUEST_FRIEND;
                responseObj.errorsObject = message.USER_CONTACT.ERROR_HAVE_NO_REQUEST_FRIEND;
                responseObj.errorsMessage = message.USER_CONTACT.ERROR_HAVE_NO_REQUEST_FRIEND.message;
                res.send(responseObj);
            }else{
                var status = userContacts[0].statusValue;
                if(Constant.USER_CONTACT_STATUS_VALUE.WATTING_FOR_ACCEPT_REQUEST != status){
                    responseObj.statusErrorCode = Constant.CODE_STATUS.USER_CONTACT.ERROR_HAVE_NO_REQUEST_FRIEND;
                    responseObj.errorsObject = message.USER_CONTACT.ERROR_HAVE_NO_REQUEST_FRIEND;
                    responseObj.errorsMessage = message.USER_CONTACT.ERROR_HAVE_NO_REQUEST_FRIEND.message;
                    res.send(responseObj);
                }else {
                    if(key == Constant.USER_CONTACT_PARAM_KEY.ACCEPT) {
                        userContactStatusDao.getUserContactStatusByValue(Constant.USER_CONTACT_STATUS_VALUE.FRIEND).then(function (status) {
                            var statusID = 0;
                            if (status.length > 0) {
                                statusID = status[0].statusID;
                            }
                            userContactDao.updateStatusToFriendFor2(statusID, userID, friendID).then(function (result) {
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
                    } else{
                        userContactStatusDao.findAll().then(function (status) {
                            var denyID = 0;
                            var deniedID = 0;
                            var blockID = 0;
                            var blockedID = 0;

                            for (i = 0; i < status.length; i++) {
                                if (status[i].statusValue == Constant.USER_CONTACT_STATUS_VALUE.DENY_MAKE_FRIEND_REQUEST) {
                                    denyID = status[i].statusID;
                                } else if (status[i].statusValue == Constant.USER_CONTACT_STATUS_VALUE.DENIED_MAKE_FRIEND_REQUEST) {
                                    deniedID = status[i].statusID;
                                } else if (status[i].statusValue == Constant.USER_CONTACT_STATUS_VALUE.BLOCK_USER_CONTACT) {
                                    blockID = status[i].statusID;
                                } else if (status[i].statusValue == Constant.USER_CONTACT_STATUS_VALUE.BLOCKED_BY_USER) {
                                    blockedID = status[i].statusID;
                                }
                            }

                            if (key == Constant.USER_CONTACT_PARAM_KEY.DENY){
                                userContactDao.updateStatus(denyID, userID, friendID).then(function (result) {
                                    console.log("success deny");
                                    userContactDao.updateStatus(deniedID, friendID, userID).then(function (result) {
                                        console.log("success denied");
                                    }, function (err) {
                                        console.log("error denied");
                                    });
                                }, function (err) {
                                    console.log("error deny");
                                });

                                responseObj.statusErrorCode = Constant.CODE_STATUS.SUCCESS;
                                responseObj.results = {};
                                res.send(responseObj);
                            } else if(key == Constant.USER_CONTACT_PARAM_KEY.BLOCK){
                                userContactDao.updateStatus(blockID, userID, friendID).then(function (result) {
                                    console.log("success block");
                                    userContactDao.updateStatus(blockedID, friendID, userID).then(function (result) {
                                        console.log("success blocked");
                                    }, function (err) {
                                        console.log("error blocked");
                                    });
                                }, function (err) {
                                    console.log("error block");
                                });

                                responseObj.statusErrorCode = Constant.CODE_STATUS.SUCCESS;
                                responseObj.results = {};
                                res.send(responseObj);
                            } else{
                                responseObj.statusErrorCode = Constant.CODE_STATUS.USER_CONTACT.ERROR_ACCEPT_FRIEND_KEY_INVALID;
                                responseObj.errorsObject = message.USER_CONTACT.ERROR_ACCEPT_FRIEND_KEY_INVALID;
                                responseObj.errorsMessage = message.USER_CONTACT.ERROR_ACCEPT_FRIEND_KEY_INVALID.message;
                                res.send(responseObj);
                                return;
                            }
                        }, function (err) {
                            responseObj.statusErrorCode = Constant.CODE_STATUS.DB_EXECUTE_ERROR;
                            responseObj.errorsObject = err;
                            responseObj.errorsMessage = message.DB_EXECUTE_ERROR.message;
                            res.send(responseObj);
                        });
                    }
                }
            }
        }, function(err){
            responseObj.statusErrorCode = Constant.CODE_STATUS.DB_EXECUTE_ERROR;
            responseObj.errorsObject = err;
            responseObj.errorsMessage = message.DB_EXECUTE_ERROR.message;
            res.send(responseObj);
        });

    }
};

var findUserContactByUser = function(req, res){
    var responseObj = new ResponseServerDto();
    var accessTokenObj = req.accessTokenObj;

    var statusValue = req.body.statusValue ? req.body.statusValue : Constant.USER_CONTACT_STATUS_VALUE.ALL;

    if(!accessTokenObj){
        responseObj.statusErrorCode = Constant.CODE_STATUS.ACCESS_TOKEN_INVALID;
        responseObj.errorsObject = message.ACCESS_TOKEN_INVALID;
        responseObj.errorsMessage = message.ACCESS_TOKEN_INVALID.message;
        res.send(responseObj);
    }else{
        var userID = accessTokenObj.userID;

        var pageNum = isNaN(req.body.pageNum)? 1 : parseInt(req.body.pageNum);
        var perPage = isNaN(req.body.perPage)? 10 : parseInt(req.body.perPage);

        userContactDao.findUserContactByUserID(userID, statusValue, pageNum, perPage).then(function(data){
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

/*Exports*/
module.exports = {
    requestAddFriend : requestAddFriend,
    acceptFriend : acceptFriend,
    findUserContactByUser : findUserContactByUser
}