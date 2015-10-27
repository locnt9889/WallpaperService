/**
 * Created by LocNT on 7/28/15.
 */

var express = require('express');
var router = express.Router();

var categoryService = require("../services/CategoryService");
var accessTokenService = require("../services/AccessTokenService");

/* POST create  */
router.post('/create', [accessTokenService.checkAccessToken, function(req, res, next) {
    categoryService.createCategory(req, res);
}]);

/* POST delete category */
router.post('/deleteCategory', [accessTokenService.checkAccessToken, function(req, res, next) {
    categoryService.deleteCategory(req, res);
}]);

/* POST get category detail*/
router.post('/getCategoryDetail', [accessTokenService.checkAccessToken, function(req, res, next) {
    categoryService.getCategoryDetail(req, res);
}]);

/* POST update category info*/
router.post('/updateCategory', [accessTokenService.checkAccessToken, function(req, res, next) {
    categoryService.updateCategory(req, res);
}]);

/* POST update category info*/
router.post('/getCategoryByShop', [accessTokenService.checkAccessToken, function(req, res, next) {
    categoryService.getCategoryByShop(req, res);
}]);

module.exports = router;
