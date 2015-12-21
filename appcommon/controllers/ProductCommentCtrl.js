/**
 * Created by LocNT on 7/28/15.
 */

var express = require('express');
var router = express.Router();

var productCommentService = require("../services/ProductCommentService");
var accessTokenService = require("../services/AccessTokenService");

/* POST create comment */
router.post('/create', [accessTokenService.checkAccessToken, function(req, res, next) {
    productCommentService.createComment(req, res);
}]);

/* POST create comment */
router.post('/edit', [accessTokenService.checkAccessToken, function(req, res, next) {
    productCommentService.editComment(req, res);
}]);

/* POST delete comment */
router.post('/delete', [accessTokenService.checkAccessToken, function(req, res, next) {
    productCommentService.deleteComment(req, res);
}]);

/* POST get comment by product */
router.post('/getByProduct', [accessTokenService.checkAccessToken, function(req, res, next) {
    productCommentService.getCommentByProduct(req, res);
}]);

/* POST get comment parent*/
router.post('/getByParent', [accessTokenService.checkAccessToken, function(req, res, next) {
    productCommentService.getCommentByParent(req, res);
}]);

module.exports = router;
