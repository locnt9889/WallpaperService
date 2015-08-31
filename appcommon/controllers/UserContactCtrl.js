/**
 * Created by LocNT on 7/28/15.
 */

var express = require('express');
var router = express.Router();

var userContactService = require("../services/UserContactService");
var accessTokenService = require("../services/AccessTokenService");

/* POST */
router.post('/requestAddFriend', [accessTokenService.checkAccessToken, function(req, res, next) {
    userContactService.requestAddFriend(req, res);
}]);
module.exports = router;
