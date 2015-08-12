/**
 * Created by LocNT on 7/29/15.
 */

var Q = require("q");
var multiparty = require('multiparty');
var fs = require('fs');
var path = require("path");

var Constant = require("../helpers/Contant");
var uploadFileHelper = require("../helpers/UploadFileHelper");

function uploadFile(req, res) {

    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        if(err){
            res.send(err);
            return;
        }
        if(files.imageFile.length == 0){
            res.send({'errcode' : "EMPTY"});
            return;
        }
        if(files.imageFile[0].size > Constant.UPLOAD_FILE_CONFIG.MAX_SIZE_IMAGE){
            res.send({'errcode' : "LIMITED"});
            return;
        }

        uploadFileHelper.writeFileUpload(files.imageFile[0].originalFilename, files.imageFile[0].path, Constant.UPLOAD_FILE_CONFIG.PRE_FORDER_IMAGE).then(function(fullFilePath){
            res.send({'path' : fullFilePath});
            return;
        },function(err){
            res.send(err);
            return;
        });
    });
}

function viewFile(req, res) {
    var file = req.params.file;
    var fullFile = Constant.UPLOAD_FILE_CONFIG.UPLOAD_FOLDER + Constant.UPLOAD_FILE_CONFIG.PRE_FORDER_IMAGE + file;
    fs.exists(fullFile, function(result){
        if(result){
            res.sendfile(path.resolve(fullFile));
        }else{
            res.writeHead(404);
            res.end();
        }
    });
}

/*Exports*/
module.exports = {
    uploadFile : uploadFile,
    viewFile : viewFile

}