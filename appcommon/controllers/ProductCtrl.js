/**
 * Created by LocNT on 7/28/15.
 */

var express = require('express');
var router = express.Router();

var productService = require("../services/ProductService");
var accessTokenService = require("../services/AccessTokenService");

/* POST create shop */
router.post('/create', [accessTokenService.checkAccessToken, function(req, res, next) {
    productService.createProduct(req, res);
}]);

module.exports = router;
