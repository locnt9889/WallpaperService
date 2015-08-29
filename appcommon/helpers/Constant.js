/**
 * Created by LocNT on 7/29/15.
 */

var TABLE_NAME_DB = {
    PERSON : "person",
    USER : "User",
    USER_DEVICE_TOKEN : "User_Device_Token",
    USER_ACCESS_TOKEN : "User_Access_Token"
}

var UPLOAD_FILE_CONFIG = {
    MAX_SIZE_IMAGE : 3145728, //3Mb
    UPLOAD_FOLDER : "uploads",
    PRE_FORDER_IMAGE : {
        IMAGE : "/Images/Demo/",
        USER_AVATAR : "/Images/User/Avatars/",
        USER_COVER : "/Images/User/Covers/",
    }
}

var CODE_STATUS = {
    SUCCESS : 0,
    FAIL : 1,
    DB_EXECUTE_ERROR : 2,
    ACCESS_TOKEN_INVALID : 3,

    USER_REGISTER : {
        USER_EMAIL_EXISTED: 1001,
        USER_REGISTER_PARAMS_EMPTY: 1002,
        USER_REGISTER_INVALID_EMAIL: 1003,
        USER_REGISTER_ERROR_LENGTH_PASSWORD: 1004,
    },
    USER_LOGIN : {
        USER_LOGIN_INCORRECT : 1101,
        USER_LOGIN_EMAIL_FB : 1102,
        USER_LOGIN_FB_ERROR_GET_PROFILE_ACCESS : 1103,
        USER_LOGIN_FB_ERROR_EMAIL_NON_FB : 1104,
        USER_LOGIN_FB_ERROR_ACCESS_TOKEN_INVALID : 1105
    },

    USER_CHANGE_PASSWORD : {
        ERROR_CHANGE_WITH_EMAIL_FB : 1201,
        ERROR_OLD_PASSWORD_INCORRECT: 1202
    },

    UPLOAD_FILE : {
        ERROR_EMPTY_FILE : 1301,
        ERROR_LIMITED_SIZE: 1302
    }
}

var USER_STATUS_VALUE = {
    NEW : "NEW",
    BLOCK : "BLOCK",
    ACTIVE : "ACTIVE"
}

var USER_FB_AVATAR_LINK = "https://graph.facebook.com/#fbID/picture?type=large";
/*Exports*/

module.exports = {
    UPLOAD_FILE_CONFIG : UPLOAD_FILE_CONFIG,
    TABLE_NAME_DB : TABLE_NAME_DB,
    CODE_STATUS : CODE_STATUS,
    USER_STATUS_VALUE : USER_STATUS_VALUE,
    USER_FB_AVATAR_LINK : USER_FB_AVATAR_LINK
}