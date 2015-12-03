/**
 * Created by LocNT on 7/28/15.
 */

var express = require('express');
var router = express.Router();

var shopAddressService = require("../services/ShopAddressService");
var accessTokenService = require("../services/AccessTokenService");

/* POST create  */
router.post('/create', [accessTokenService.checkAccessToken, function(req, res, next) {
    shopAddressService.createAddress(req, res);
}]);

/* POST delete */
router.post('/delete', [accessTokenService.checkAccessToken, function(req, res, next) {
    shopAddressService.deleteAddress(req, res);
}]);

/* POST get category detail*/
router.post('/getDetail', [accessTokenService.checkAccessToken, function(req, res, next) {
    shopAddressService.getAddressDetail(req, res);
}]);

/* POST update category info*/
router.post('/update', [accessTokenService.checkAccessToken, function(req, res, next) {
    shopAddressService.updateAddress(req, res);
}]);

/* POST update category info*/
router.post('/getAddressByShop', [accessTokenService.checkAccessToken, function(req, res, next) {
    shopAddressService.getAddressByShop(req, res);
}]);

module.exports = router;
