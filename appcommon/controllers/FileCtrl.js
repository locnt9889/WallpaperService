/**
 * Created by LocNT on 7/28/15.
 */

var express = require('express');
var router = express.Router();
var path = require("path");

var mkdirp = require("mkdirp");

var fileService = require("../services/FileService");
var Constant = require("../helpers/Constant")

/* GET action */
router.get('/upload-view', function(req, res, next) {
    res.sendfile("views/upload-client.html");
});

/* GET action */
router.post('/upload-action', function(req, res, next) {

    fileService.uploadFile(req, res);
});

/// Show files
router.get('/view-file/:file', function (req, res) {
    fileService.viewFile(req, res, Constant.UPLOAD_FILE_CONFIG.PRE_FOLDER_IMAGE.IMAGE);
});

/// Show files
router.get('/view-user-avatar/:file', function (req, res) {
    fileService.viewFile(req, res, Constant.UPLOAD_FILE_CONFIG.PRE_FOLDER_IMAGE.USER_AVATAR);
});

/// Show files
router.get('/view-user-cover/:file', function (req, res) {
    fileService.viewFile(req, res, Constant.UPLOAD_FILE_CONFIG.PRE_FOLDER_IMAGE.USER_COVER);
});

/// Show files
router.get('/view-shop-avatar/:file', function (req, res) {
    fileService.viewFile(req, res, Constant.UPLOAD_FILE_CONFIG.PRE_FOLDER_IMAGE.SHOP_AVATAR);
});

/// Show files
router.get('/view-shop-cover/:file', function (req, res) {
    fileService.viewFile(req, res, Constant.UPLOAD_FILE_CONFIG.PRE_FOLDER_IMAGE.SHOP_COVER);
});

/// Show files
router.get('/view-category-cover/:file', function (req, res) {
    fileService.viewFile(req, res, Constant.UPLOAD_FILE_CONFIG.PRE_FOLDER_IMAGE.CATEGORY_COVER);
});

/// Show files
router.get('/download-clone/', function (req, res) {
    //fileService.viewFile(req, res, Constant.UPLOAD_FILE_CONFIG.PRE_FOLDER_IMAGE.SHOP_COVER);

    var http = require('http');
    var fs = require('fs');

    //var file = fs.createWriteStream("file.jpg");
    //var file = null;
    var PRE_URL = "http://www.houseofpictures.dk/hop/download/";

    //var pre_path = req.query.path;   //article/3373
    var pre_path = "article/3373";

    var url_path = PRE_URL + pre_path;

    var folder_path = "downloads/" + pre_path;
    //if (!fs.exists(path.resolve(folder_path))){
        //fs.mkdirSync(path.resolve(folder_path));
    //}

    mkdirp(path.resolve(folder_path), function (err) {
        if (err) {
            console.error(err);
            res.send(err);
        }else{
            for(var i = 20; i < 40; i ++){
                var url = url_path + "/";
                var name = "thumbnail_JS_#num.jpg";
                //var filepath = "downloads/3373/";

                var numStr = "" + i;
                if(i < 10){
                    numStr = "0" + numStr;
                }
                name = name.replace("#num", numStr);
                url = url + name;
                //filepath = filepath + name;

                var request = http.get(url, function(response) {
                    var nameFile = response.req.path.substr(response.req.path.lastIndexOf("/"));
                    var filepath = folder_path + nameFile;

                    if(response.statusCode == 200) {
                        var file = fs.createWriteStream(filepath);
                        response.pipe(file);
                        file.on('finish', function () {
                            console.log("download success : " + filepath);
                            file.close(function () {
                                console.log("close success : " + filepath);
                            });
                        });
                    }
                });
            }

            res.end("never gone");

        }
    });


});

module.exports = router;
