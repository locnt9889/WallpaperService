/**
 * Created by LocNT on 7/29/15.
 */

var GENERIC_SQL = {
    SLQ_FINDALL : "SELECT * FROM ??",
    SLQ_FINDALL_ACTIVE : "SELECT * FROM ?? WHERE active = 1",
    SLQ_FINDONE_BY_ID : "SELECT * FROM ?? WHERE ?? = ?",
    SLQ_ADD_NEW : "INSERT INTO ?? SET ?",
    SLQ_UPDATE : "UPDATE ?? SET ? WHERE ?? = ?",
    SLQ_DO_INACTIVE : "UPDATE ?? SET active = 0 WHERE ?? = ?",
    SLQ_REMOVE : "DELETE FROM ?? WHERE ?? = ?"
}

var ACCESS_TOKEN_MODULE = {
    SQL_CHECK_ACCESS : "SELECT * FROM person_access WHERE access_token = ? AND active = 1",
}

var USER_SQL_SCRIPT = {
    CHECK_EMAIL_EXIST : "SELECT u.*,ust.statusValue FROM User u INNER JOIN User_Status ust WHERE email = ?",
    CHECK_LOGIN : "SELECT u.*,ust.statusValue FROM User u INNER JOIN User_Status ust WHERE email = ? AND passWord = ? AND isActive = 1",
    USER_STATUS_SCRIPT : {
        GET_USER_STATUS_ID_BY_VALUE : "SELECT userStatusID FROM User_Status WHERE statusValue = ?"
    },
    FIND_DEVICE_TOKEN_BY_VALUE : "SELECT * FROM User_Device_Token WHERE deviceTokenValue = ?",

    SLQ_CHANGE_PASSWORD : "UPDATE User SET passWord = ? WHERE userID = ?",
    SLQ_REMOVE_ALL_OTHER_BY_USER : "DELETE FROM User_Access_Token WHERE accessTokenValue != ? AND userID = ?",
    SQL_CHECK_ACCESS_TOKEN : "SELECT udt.id, udt.accessTokenValue, u.* FROM User u INNER JOIN User_Access_Token udt ON u.userID = udt.userID WHERE udt.accessTokenValue = ?",

    SQL_GET_USER_PROFILE : "SELECT u.*,ust.statusValue FROM User u INNER JOIN User_Status ust ON u.userStatusID = ust.userStatusID WHERE u.userID = ?",
    
    SQL_SEARCH_USER : "SELECT userID, email, iShowEmail, fullName, dateOfBirth, gender, phoneNumber, isShowPhoneNumber, avatarImageURL, coverImageURL, isFacebookAccount FROM User WHERE isActive=1 AND ( fullName LIKE ? OR email LIKE ? ) LIMIT ?, ?",
    SQL_COUNT_NUMBER_SEARCH_USER : "SELECT COUNT(userID) as totalItems FROM User WHERE fullName LIKE ? OR email LIKE ?"
}

var USER_CONTACT_SQL_SCRIPT = {
    SLQ_ADD_NEW_MULTI : "INSERT INTO User_Contacts (id, userID, friendID, statusID, createdDate, modifiedDate) VALUES ?",
    USER_CONTACT_STATUS_SCRIPT : {
        GET_USER_STATUS_ID_BY_VALUE : "SELECT statusID FROM User_Contact_Status WHERE statusValue = ?"
    }
}

/*Exports*/

module.exports = {
    GENERIC_SQL : GENERIC_SQL,
    ACCESS_TOKEN_MODULE : ACCESS_TOKEN_MODULE,
    USER_SQL_SCRIPT : USER_SQL_SCRIPT,
    USER_CONTACT_SQL_SCRIPT : USER_CONTACT_SQL_SCRIPT
}