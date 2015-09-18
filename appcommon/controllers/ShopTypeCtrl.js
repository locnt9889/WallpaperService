/**
 * Created by LocNT on 7/28/15.
 */

var express = require('express');
var router = express.Router();

var shopTypeService = require("../services/ShopTypeService");
var accessTokenService = require("../services/AccessTokenService");

/* POST */
router.post('/getAllShopTypeParent', [accessTokenService.checkAccessToken, function(req, res, next) {
    shopTypeService.getAllShopTypeParent(req, res);
}]);

/* POST */
router.post('/getAllShopTypeChildByParent', [accessTokenService.checkAccessToken, function(req, res, next) {
    shopTypeService.getAllShopTypeChildByParent(req, res);
}]);

/* POST */
router.post('/getAllShopTypeData', [accessTokenService.checkAccessToken, function(req, res, next) {
    shopTypeService.getAllShopTypeData(req, res);
}]);

module.exports = router;
