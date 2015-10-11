/**
 * Created by LocNT on 7/28/15.
 */

var express = require('express');
var router = express.Router();

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
    fileService.viewFile(req, res, Constant.UPLOAD_FILE_CONFIG.PRE_FORDER_IMAGE.IMAGE);
});

/// Show files
router.get('/view-user-avatar/:file', function (req, res) {
    fileService.viewFile(req, res, Constant.UPLOAD_FILE_CONFIG.PRE_FORDER_IMAGE.USER_AVATAR);
});

/// Show files
router.get('/view-user-cover/:file', function (req, res) {
    fileService.viewFile(req, res, Constant.UPLOAD_FILE_CONFIG.PRE_FORDER_IMAGE.USER_COVER);
});

/// Show files
router.get('/view-shop-avatar/:file', function (req, res) {
    fileService.viewFile(req, res, Constant.UPLOAD_FILE_CONFIG.PRE_FORDER_IMAGE.SHOP_AVATAR);
});

/// Show files
router.get('/view-shop-cover/:file', function (req, res) {
    fileService.viewFile(req, res, Constant.UPLOAD_FILE_CONFIG.PRE_FORDER_IMAGE.SHOP_COVER);
});

module.exports = router;
