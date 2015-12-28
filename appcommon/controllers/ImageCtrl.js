/**
 * Created by LocNT on 7/28/15.
 */

var express = require('express');
var router = express.Router();

var imageService = require("../services/ImageService");

/* POST find all category */
router.get('/search', [function(req, res, next) {
    imageService.findImage(req, res);
}]);

module.exports = router;
