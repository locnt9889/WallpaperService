/**
 * Created by LocNT on 7/28/15.
 */

var express = require('express');
var router = express.Router();

var uploadFileService = require("../services/UploadFileService");

/* GET action */
router.get('/upload-view', function(req, res, next) {
    res.sendfile("views/upload-client.html");
});

/* GET action */
router.post('/upload-action', function(req, res, next) {

    uploadFileService.uploadFile(req, res);
});

/// Show files
router.get('/view-file/:file', function (req, res) {
    uploadFileService.viewFile(req, res);
});

module.exports = router;
