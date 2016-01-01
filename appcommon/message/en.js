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

var CATEGORY = {
    CATEGORY_INVALID : {
        code: 1601,
        message: "Category is invalid"
    }
}
var IMAGE = {
    IMAGE_INVALID : {
        code: 1701,
        message: "Category is invalid"
    },
    SEARCH_IMAGE_ORDER_FIELD_INVALID : {
        code: 1702,
        message: "Search image order field is invalid!"
    },
    SEARCH_IMAGE_ORDER_TYPE_INVALID: {
        code: 1703,
        message: "Search image order type is invalid.please input DESC OR ASC OR a empty field"
    },
    EXECUTE_TYPE_INVALID: {
        code: 1704,
        message: "Execute type is invalid.please input VIEW OR DOWNLOAD OR FAVORITE"
    }
}

module.exports = {
    SUCCESS : SUCCESS,
    FAIL : FAIL,
    DB_EXECUTE_ERROR : DB_EXECUTE_ERROR,
    CATEGORY : CATEGORY,
    IMAGE : IMAGE
}