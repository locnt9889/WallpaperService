/**
 * Created by LocNT on 8/17/15.
 */

var Constant = require("../helpers/Constant");
var message = require("../message/en");

var getExtFileByName = function(fileName) {
    var lastDotIndex = fileName.lastIndexOf(".");
    if (lastDotIndex == -1) {
        return "";
    } else{
        return fileName.substr(lastDotIndex);
    }
}

/*Export*/

module.exports = {
    getExtFileByName : getExtFileByName
}