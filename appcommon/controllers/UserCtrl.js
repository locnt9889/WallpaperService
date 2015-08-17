/**
 * Created by LocNT on 7/28/15.
 */

var express = require('express');
var router = express.Router();

var userService = require("../services/UserService");

/* POST register. */
router.post('/register-email', function(req, res, next) {
    userService.registerByEmail(req, res);
});

/* POST login. */
router.post('/login-email', function(req, res, next) {
    userService.loginByEmail(req, res);
});

/* POST login. by fb */
router.post('/login-fb', function(req, res, next) {
    userService.loginByFb(req, res);
});

module.exports = router;
