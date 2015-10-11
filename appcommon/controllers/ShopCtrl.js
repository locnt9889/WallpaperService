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

/* POST getShopTypeByShop */
router.post('/getShopTypeByShop', [accessTokenService.checkAccessToken, function(req, res, next) {
    shopService.getShopTypeByShop(req, res);
}]);

/* POST create shop */
router.post('/updateTypeOfShop', [accessTokenService.checkAccessToken, function(req, res, next) {
    shopService.updateTypeOfShop(req, res);
}]);

/* POST create shop */
router.post('/getShopDistrictByShop', [accessTokenService.checkAccessToken, function(req, res, next) {
    shopService.getShopDistrictByShop(req, res);
}]);

/* POST create shop */
router.post('/updateDistrictOfShop', [accessTokenService.checkAccessToken, function(req, res, next) {
    shopService.updateDistrictOfShop(req, res);
}]);
/* POST updateAvatarOfShop */
router.post('/updateAvatarOfShop', [accessTokenService.checkAccessToken, function(req, res, next) {
    shopService.updateAvatarOfShop(req, res);
}]);
/* POST create shop */
router.post('/updateCoverOfShop', [accessTokenService.checkAccessToken, function(req, res, next) {
    shopService.updateCoverOfShop(req, res);
}]);

/* POST delete shop */
router.post('/deleteShop', [accessTokenService.checkAccessToken, function(req, res, next) {
    shopService.deleteShop(req, res);
}]);

/* POST get shop detail*/
router.post('/getShopDetail', [accessTokenService.checkAccessToken, function(req, res, next) {
    shopService.getShopDetail(req, res);
}]);

module.exports = router;
