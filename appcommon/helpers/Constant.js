/**
 * Created by LocNT on 7/29/15.
 */

var TABLE_NAME_DB = {
    CATEGORY : {
        NAME : "category",
        NAME_FIELD_ID : "id"
    },
    IMAGE : {
        NAME : "image2",
        NAME_FIELD_ID : "id",
        NAME_FIELD_CATEGORY_ID : "category_id",
        NAME_FIELD_NAME : "name",
        NAME_FIELD_COUNT_VIEW : "count_view",
        NAME_FIELD_COUNT_DOWNLOAD : "count_download",
        NAME_FIELD_COUNT_FAVORITE : "count_favorite"
    }
}

var CODE_STATUS = {
    SUCCESS : 0,
    FAIL : 1,
    DB_EXECUTE_ERROR : 2,

    CATEGORY : {
        CATEGORY_INVALID : 1601,
    },
    IMAGE : {
        IMAGE_INVALID : 1701,
        SEARCH_IMAGE_ORDER_FIELD_INVALID: 1702,
        SEARCH_IMAGE_ORDER_TYPE_INVALID: 1703,
        EXECUTE_TYPE_INVALID: 1704
    }
}

var ORDER_CONSTANT = {
    ORDER_TYPE : {
        DESC : "DESC",
        ASC : "ASC"
    }
}

var INCREASE_TYPE = {
    DOWNLOAD : "DOWNLOAD",
    VIEW : "VIEW",
    FAVORITE : "FAVORITE"
}

/*Exports*/
module.exports = {
    TABLE_NAME_DB : TABLE_NAME_DB,
    CODE_STATUS : CODE_STATUS,
    ORDER_CONSTANT : ORDER_CONSTANT,
    INCREASE_TYPE : INCREASE_TYPE
}