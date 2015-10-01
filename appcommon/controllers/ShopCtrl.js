/**
 * Created by LocNT on 7/28/15.
 */

var express = require('express');
var router = express.Router();

var shopService = require("../services/ShopService");
var accessTokenService = require("../services/AccessTokenService");

/* POST create shop */
router.post('/create', [accessTokenService.checkAccessToken, function(req, res, next) {
    shopService.createShop(req, res);
}]);

/* POST create shop */
router.post('/getShopByUser', [accessTokenService.checkAccessToken, function(req, res, next) {
    shopService.getShopByUser(req, res);
}]);

/* POST create shop */
router.post('/getShopTypeByShop', [accessTokenService.checkAccessToken, function(req, res, next) {
    shopService.getShopTypeByShop(req, res);
}]);

/* POST create shop */
router.post('/getShopDistrictByShop', [accessTokenService.checkAccessToken, function(req, res, next) {
    shopService.getShopDistrictByShop(req, res);
}]);

module.exports = router;
