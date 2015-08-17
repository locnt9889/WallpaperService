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

var USER_REGISTER = {
    USER_EMAIL_EXISTED : {
        code: 101,
        message: "Email has existed!"
    },
    USER_REGISTER_PARAMS_EMPTY : {
        code: 102,
        message: "Error empty with parameter required!"
    },
    USER_REGISTER_INVALID_EMAIL : {
        code: 103,
        message: "Email is invalid!"
    },
    USER_REGISTER_ERROR_LENGTH_PASSWORD : {
        code: 104,
        message: "Password have length between 6 and 20!"
    }
}

var USER_LOGIN = {
    USER_LOGIN_INCORRECT : {
        code : 201,
        message : "Login is failure, Email or Password is incorrect!"
    },
    USER_LOGIN_EMAIL_FB : {
        code: 202,
        message: "Login is failure, please login by FB with this email!"
    },
    USER_LOGIN_FB_ERROR_GET_PROFILE_ACCESS : {
        code: 203,
        message: "Login facebook, get info of access token is failure!"
    },
    USER_LOGIN_FB_ERROR_EMAIL_NON_FB : {
        code: 204,
        message: "Login facebook, user is not a user fb!"
    },
    USER_LOGIN_FB_ERROR_ACCESS_TOKEN_INVALID : {
        code: 205,
        message: "Login facebook, access token is invalid!"
    }
}

module.exports = {
    SUCCESS : SUCCESS,
    FAIL : FAIL,
    DB_EXECUTE_ERROR : DB_EXECUTE_ERROR,
    USER_REGISTER : USER_REGISTER,
    USER_LOGIN : USER_LOGIN

}