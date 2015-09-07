/**
 * Created by LocNT on 7/30/15.
 */

var MysqlHelper = new require("../helpers/MysqlHelper");
var constant = require("../helpers/Constant");
var notificationDao = new MysqlHelper(constant.TABLE_NAME_DB.NOTIFICATION.NAME);

/*Export*/
module.exports = notificationDao;