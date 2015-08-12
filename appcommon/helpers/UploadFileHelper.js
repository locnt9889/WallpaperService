/**
 * Created by LocNT on 7/29/15.
 */

var Q = require("q");
var fs = require('fs');
var path = require("path");

var Constant = require("../helpers/Contant");

function writeFileUpload(fileName, filePath, preFolder){
    var deferred = Q.defer();
    fs.readFile(filePath, function (err,data) {
        if (err) {
            deferred.reject(err);
        }else {
            var currentDate = new Date();
            var filepathSave = currentDate.getTime() + fileName;
            var fullFilePath = Constant.UPLOAD_FILE_CONFIG.UPLOAD_FOLDER + preFolder + filepathSave;
            console.log("fullFilePath : " + fullFilePath);
            fs.writeFile(fullFilePath, data, function (err) {
                if (err) {
                    deferred.reject(err);
                }else{
                    deferred.resolve(filepathSave);
                }
            });
        }
    });
    return deferred.promise;
}

/*Exports*/
module.exports = {
    writeFileUpload : writeFileUpload

}