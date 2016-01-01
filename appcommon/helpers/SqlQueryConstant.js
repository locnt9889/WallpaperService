/**
 * Created by LocNT on 7/29/15.
 */

var GENERIC_SQL = {
    SLQ_FINDALL : "SELECT * FROM ??",
    SLQ_FINDALL_ACTIVE : "SELECT * FROM ?? WHERE ?? = 1",
    SLQ_FINDONE_BY_ID : "SELECT * FROM ?? WHERE ?? = ?",
    SLQ_FINDALL_BY_FIELD : "SELECT * FROM ?? WHERE ?? = ?",
    SLQ_FINDALL_BY_FIELD_ACTIVE : "SELECT * FROM ?? WHERE ?? = ? AND isActive = 1",
    SLQ_ADD_NEW : "INSERT INTO ?? SET ?",
    SLQ_UPDATE : "UPDATE ?? SET ? WHERE ?? = ?",
    SLQ_DO_INACTIVE : "UPDATE ?? SET active = 0 WHERE ?? = ?",
    SLQ_REMOVE : "DELETE FROM ?? WHERE ?? = ?"
}

var CATEGORY_SQL_SCRIPT = {
    FINDALL_WITH_NUMBER_IMAGE: "SELECT ca.*, (SELECT COUNT(img.id) FROM image2 img WHERE img.category_id = ca.id) AS images FROM category ca"
}

var IMAGE_SQL_SCRIPT = {
    COUNT_GET_LIST_IMAGE : "SELECT COUNT(*) AS totalItems FROM image2 WHERE #category #name",
    GET_LIST_IMAGE : "SELECT * FROM image2 WHERE #category #name ORDER BY #orderBy #orderType LIMIT ?, ?",
    EXECUTE_INCREASE : "UPDATE image2 SET ?? = ?? + 1 WHERE id = ?"
}
/*Exports*/

module.exports = {
    GENERIC_SQL : GENERIC_SQL,
    CATEGORY_SQL_SCRIPT : CATEGORY_SQL_SCRIPT,
    IMAGE_SQL_SCRIPT : IMAGE_SQL_SCRIPT
}