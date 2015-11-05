/**
 * Created by LocNT on 7/28/15.
 */

var express = require('express');
var router = express.Router();

var productService = require("../services/ProductService");
var accessTokenService = require("../services/AccessTokenService");

/* POST create product */
router.post('/create', [accessTokenService.checkAccessToken, function(req, res, next) {
    productService.createProduct(req, res);
}]);

/* POST get product by category*/
router.post('/getProductByCategory', [accessTokenService.checkAccessToken, function(req, res, next) {
    productService.getProductByCategory(req, res);
}]);

/* POST get detail product */
router.post('/getProductDetail', [accessTokenService.checkAccessToken, function(req, res, next) {
    productService.getProductDetail(req, res);
}]);

/* POST delete product */
router.post('/deleteProduct', [accessTokenService.checkAccessToken, function(req, res, next) {
    productService.deleteProduct(req, res);
}]);

module.exports = router;
