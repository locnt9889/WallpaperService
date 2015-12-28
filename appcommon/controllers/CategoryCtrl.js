/**
 * Created by LocNT on 7/28/15.
 */

var express = require('express');
var router = express.Router();

var categoryService = require("../services/CategoryService");

/* POST find all category */
router.get('/all', [function(req, res, next) {
    categoryService.findAllCategory(req, res);
}]);

module.exports = router;
