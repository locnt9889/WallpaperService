/**
 * Created by LocNT on 7/29/15.
 */

var TABLE_NAME_DB = {
    USER : {
        NAME : "User",
        NAME_FIELD_ID : "userID"
    }
}

var CODE_STATUS = {
    SUCCESS : 0,
    FAIL : 1,
    DB_EXECUTE_ERROR : 2,

    CATEGORY : {
        CREATE_CATEGORY_EMPTY_FIELD: 1601,
        CREATE_CATEGORY_NAME_OF_SHOP_EXIST : 1602,
        CATEGORY_INVALID : 1603,
        CATEGORY_UPDATE_USER_IS_DENIED : 1605
    }
}

/*Exports*/
module.exports = {
    TABLE_NAME_DB : TABLE_NAME_DB,
    CODE_STATUS : CODE_STATUS
}