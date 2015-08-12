/**
 * Created by LocNT on 7/29/15.
 */

var GENERIC_SQL = {
    SLQ_FINDALL_ACTIVE : "SELECT * FROM ?? WHERE active = 1",
    SLQ_FINDONE_BY_ID : "SELECT * FROM ?? WHERE id = ?",
    SLQ_ADD_NEW : "INSERT INTO ?? SET ?",
    SLQ_UPDATE : "UPDATE ?? SET ? WHERE id = ?",
    SLQ_DO_INACTIVE : "UPDATE ?? SET active = 0 WHERE id = ?",
    SLQ_REMOVE : "DELETE FROM ?? WHERE id = ?"
}

var ACCESS_TOKEN_MODULE = {
    SQL_CHECK_ACCESS : "SELECT * FROM person_access WHERE access_token = ? AND active = 1"
}

/*Exports*/

module.exports = {
    GENERIC_SQL : GENERIC_SQL,
    ACCESS_TOKEN_MODULE : ACCESS_TOKEN_MODULE
}