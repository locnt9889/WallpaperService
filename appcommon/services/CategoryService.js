/**
 * Created by LocNT on 7/29/15.
 */
var https = require('https');

var categoryDao = require("../daos/CategoryDao");

var ResponseServerDto = require("../modelsDto/ResponseServerDto");

var Constant = require("../helpers/Constant");
var message = require("../message/en");
var checkValidateUtil = require("../utils/CheckValidateUtil");
var serviceUtil = require("../utils/ServiceUtil");

var findAllCategory = function(req, res){
    var responseObj = new ResponseServerDto();

    categoryDao.findAllWithNumberImage().then(function (data) {
        responseObj.statusErrorCode = Constant.CODE_STATUS.SUCCESS;
        responseObj.results = data;
        res.send(responseObj);
    }, function (err) {
        responseObj.statusErrorCode = Constant.CODE_STATUS.DB_EXECUTE_ERROR;
        responseObj.errorsObject = err;
        responseObj.errorsMessage = message.DB_EXECUTE_ERROR.message;
        res.send(responseObj);
    });
};

/*Exports*/
module.exports = {
    findAllCategory : findAllCategory
}