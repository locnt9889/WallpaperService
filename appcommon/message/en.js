/**
 * Created by LocNT on 8/16/15.
 */

var SUCCESS = {
    code : 0,
    message : "Successfully!"
}

var FAIL = {
    code : 1,
    message : "Failure!"
}

var DB_EXECUTE_ERROR = {
    code : 2,
    message : "Database query is failure!"
}

var ACCESS_TOKEN_INVALID = {
    code : 3,
    message : "Access token is invalid!"
}

var USER_REGISTER = {
    USER_EMAIL_EXISTED : {
        code: 1001,
        message: "Email has existed!"
    },
    USER_REGISTER_PARAMS_EMPTY : {
        code: 1002,
        message: "Error empty with parameter required!"
    },
    USER_REGISTER_INVALID_EMAIL : {
        code: 1003,
        message: "Email is invalid!"
    },
    USER_REGISTER_ERROR_LENGTH_PASSWORD : {
        code: 1004,
        message: "Password have length between 6 and 20!"
    }
}

var USER_LOGIN = {
    USER_LOGIN_INCORRECT : {
        code : 1101,
        message : "Login is failure, Email or Password is incorrect!"
    },
    USER_LOGIN_EMAIL_FB : {
        code: 1102,
        message: "Login is failure, please login by FB with this email!"
    },
    USER_LOGIN_FB_ERROR_GET_PROFILE_ACCESS : {
        code: 1103,
        message: "Login facebook, get info of access token is failure!"
    },
    USER_LOGIN_FB_ERROR_EMAIL_NON_FB : {
        code: 1104,
        message: "Login facebook, user is not a user fb!"
    },
    USER_LOGIN_FB_ERROR_ACCESS_TOKEN_INVALID : {
        code: 1105,
        message: "Login facebook, access token is invalid!"
    }
}

var USER_CHANGE_PASSWORD = {
    ERROR_CHANGE_WITH_EMAIL_FB : {
        code: 1201,
        message: "Can not change password of FB user!"
    },
    ERROR_OLD_PASSWORD_INCORRECT : {
        code: 1202,
        message: "Old password is incorrect!"
    }
}

var UPLOAD_FILE = {
    UPLOAD_FAIL : {
        code: 1301,
        message: "File upload is failure!"
    },
    ERROR_EMPTY_FILE : {
        code: 1302,
        message: "File upload is empty!"
    },
    ERROR_LIMITED_SIZE: {
        code: 1303,
        message: "File upload is limited size!"
    }
}

module.exports = {
    SUCCESS : SUCCESS,
    FAIL : FAIL,
    DB_EXECUTE_ERROR : DB_EXECUTE_ERROR,
    ACCESS_TOKEN_INVALID : ACCESS_TOKEN_INVALID,
    USER_REGISTER : USER_REGISTER,
    USER_LOGIN : USER_LOGIN,
    USER_CHANGE_PASSWORD : USER_CHANGE_PASSWORD,
    UPLOAD_FILE : UPLOAD_FILE

}