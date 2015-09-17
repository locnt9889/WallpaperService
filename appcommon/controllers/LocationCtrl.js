/**
 * Created by LocNT on 7/28/15.
 */

var express = require('express');
var router = express.Router();

var locationService = require("../services/LocationService");
var accessTokenService = require("../services/AccessTokenService");

/* POST */
router.post('/getAllProvince', [accessTokenService.checkAccessToken, function(req, res, next) {
    locationService.getAllProvince(req, res);
}]);

/* POST */
router.post('/getAllDistrictByProvince', [accessTokenService.checkAccessToken, function(req, res, next) {
    locationService.getAllDistrictByProvince(req, res);
}]);

/* POST */
router.post('/getAllWardByDistrict', [accessTokenService.checkAccessToken, function(req, res, next) {
    locationService.getAllWardByDistrict(req, res);
}]);

/* POST */
router.post('/getLocationData', [accessTokenService.checkAccessToken, function(req, res, next) {
    locationService.getLocationData(req, res);
}]);

module.exports = router;
