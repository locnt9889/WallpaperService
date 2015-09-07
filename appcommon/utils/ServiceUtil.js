/**
 * Created by LocNT on 8/17/15.
 */

var uuid = require('node-uuid');

var notificationDao = require("../daos/NotificationDao");

var Notification = require("../models/Notification");

var Constant = require("../helpers/Constant");
var message = require("../message/en");
var messageNotification = require("../message/notification_en");

var generateAccessToken = function(){
    var newUuid = uuid.v1();
    return newUuid;
}

var getExtFileByName = function(fileName) {
    var lastDotIndex = fileName.lastIndexOf(".");
    if (lastDotIndex == -1) {
        return "";
    } else{
        return fileName.substr(lastDotIndex);
    }
}

var addNotificationForUserContact = function(userID, friendID, key){
    //add to notification
    var notificationUser = new Notification();
    notificationUser.userID = userID;
    notificationUser.friendID = friendID;
    notificationUser.type = Constant.NOTIFICATION_TYPE.USER_CONTACT;

    var notificationFriend = new Notification();
    notificationFriend.userID = friendID;
    notificationFriend.friendID = userID;
    notificationFriend.type = Constant.NOTIFICATION_TYPE.USER_CONTACT;

    if (key == Constant.USER_CONTACT_PARAM_KEY.DENY){
        notificationUser.message = messageNotification.USER_CONTACT_NOTIFICATION_MESSAGE.DENY.USER_DENY;
        notificationFriend.message = messageNotification.USER_CONTACT_NOTIFICATION_MESSAGE.DENY.USER_DENIED;
    }else if(key == Constant.USER_CONTACT_PARAM_KEY.REMOVE){
        notificationUser.message = messageNotification.USER_CONTACT_NOTIFICATION_MESSAGE.REMOVE.USER_REMOVE;
        notificationFriend.message = messageNotification.USER_CONTACT_NOTIFICATION_MESSAGE.REMOVE.USER_REMOVED;
    }else if(key == Constant.USER_CONTACT_PARAM_KEY.ACCEPT){
        notificationUser.message = messageNotification.USER_CONTACT_NOTIFICATION_MESSAGE.ACCEPT.USER_ACCEPT;
        notificationFriend.message = messageNotification.USER_CONTACT_NOTIFICATION_MESSAGE.ACCEPT.USER_ACCEPTED;
    }else{
        return;
    }

    notificationDao.addNew(notificationUser).then(function (result) {
        console.log("success notificationUser");
    }, function (err) {
        console.log("error notificationUser");
    });

    notificationDao.addNew(notificationFriend).then(function (result) {
        console.log("success notificationUser");
    }, function (err) {
        console.log("error notificationUser");
    });
}

/*Export*/

module.exports = {
    generateAccessToken : generateAccessToken,
    getExtFileByName : getExtFileByName,
    addNotificationForUserContact : addNotificationForUserContact
}