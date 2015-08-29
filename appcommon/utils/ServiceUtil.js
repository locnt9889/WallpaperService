/**
 * Created by LocNT on 8/17/15.
 */

var uuid = require('node-uuid');

var generateAccessToken = function(){
    var newUuid = uuid.v1();
    return newUuid;
}

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
    generateAccessToken : generateAccessToken,
    getExtFileByName : getExtFileByName
}