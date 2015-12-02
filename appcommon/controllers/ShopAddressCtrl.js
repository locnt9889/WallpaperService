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

module.exports = router;
