/**
 * Created by LocNT on 7/28/15.
 */

var express = require('express');
var router = express.Router();

var userFavoriteService = require("../services/UserFavoriteService");
var accessTokenService = require("../services/AccessTokenService");

/* POST */
router.post('/execute', [accessTokenService.checkAccessToken, function(req, res, next) {
    userFavoriteService.executeFavorite(req, res);
}]);

/* POST */
router.post('/checkFavorite', [accessTokenService.checkAccessToken, function(req, res, next) {
    userFavoriteService.checkItemIsFavorite(req, res);
}]);

/* POST */
router.post('/getListFavorite', [accessTokenService.checkAccessToken, function(req, res, next) {
    userFavoriteService.getListFavorite(req, res);
}]);

module.exports = router;
