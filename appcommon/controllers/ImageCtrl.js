/**
 * Created by LocNT on 7/28/15.
 */

var express = require('express');
var router = express.Router();

var imageService = require("../services/ImageService");

/* GET search image */
router.get('/search', [function(req, res, next) {
    imageService.findImage(req, res);
}]);

/* GET exexute */
router.get('/execute', [function(req, res, next) {
    imageService.executeIncrease(req, res);
}]);

module.exports = router;
