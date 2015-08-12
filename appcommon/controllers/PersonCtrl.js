/**
 * Created by LocNT on 7/28/15.
 */

var express = require('express');
var router = express.Router();

var personService = require("../services/PersonService");
var personAccessService = require("../services/AccessService");

//router.all('/*', PersonAccessService.checkAccessToken);

/* GET home page. */
router.get('/findall-access', [personAccessService.checkAccessToken, function(req, res, next) {
    personService.getAllPerson(req, res);
}]);

/* GET home page. */
router.get('/findall', function(req, res, next) {
    personService.getAllPerson(req, res);
});
/* GET home page. */
router.get('/findbyid', function(req, res, next) {
    personService.getOneById(req, res);
});
/* GET home page. */
router.get('/add', function(req, res, next) {
    personService.addNew(req, res);
});

/* GET home page. */
router.get('/update', function(req, res, next) {
    personService.update(req, res);
});

/* GET home page. */
router.get('/inactivate', function(req, res, next) {
    personService.inactivate(req, res);
});

/* GET home page. */
router.get('/remove', function(req, res, next) {
    personService.remove(req, res);
});

module.exports = router;
