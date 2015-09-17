/**
 * Created by LocNT on 7/29/15.
 */
var MD5 = require("MD5");
var https = require('https');
var StringDecoder = require('string_decoder').StringDecoder;
var multiparty = require('multiparty');

var provinceDao = require("../daos/ProvinceDao");
var districtDao = require("../daos/DistrictDao");
var wardDao = require("../daos/WardDao");

var ResponseServerDto = require("../modelsDto/ResponseServerDto");

var Constant = require("../helpers/Constant");
var message = require("../message/en");

var PROVINCE_ID_FIELD_NAME = Constant.TABLE_NAME_DB.PROVINCE.NAME_FIELD_ID;
var DISTRICT_ID_FIELD_NAME = Constant.TABLE_NAME_DB.DISTRICT.NAME_FIELD_ID;
var WARD_ID_FIELD_NAME = Constant.TABLE_NAME_DB.WARD.NAME_FIELD_ID;


var getAllProvince = function(req, res){
    var responseObj = new ResponseServerDto();
    var accessTokenObj = req.accessTokenObj;

    if(!accessTokenObj){
        responseObj.statusErrorCode = Constant.CODE_STATUS.ACCESS_TOKEN_INVALID;
        responseObj.errorsObject = message.ACCESS_TOKEN_INVALID;
        responseObj.errorsMessage = message.ACCESS_TOKEN_INVALID.message;
        res.send(responseObj);
    }else{
        provinceDao.findAll().then(function(data){
            responseObj.statusErrorCode = Constant.CODE_STATUS.SUCCESS;
            responseObj.results = data;
            res.send(responseObj);
        }, function(err){
            responseObj.statusErrorCode = Constant.CODE_STATUS.DB_EXECUTE_ERROR;
            responseObj.errorsObject = err;
            responseObj.errorsMessage = message.DB_EXECUTE_ERROR.message;
            res.send(responseObj);
        });
    }
};

var getAllDistrictByProvince = function(req, res){
    var responseObj = new ResponseServerDto();
    var accessTokenObj = req.accessTokenObj;

    if(!accessTokenObj){
        responseObj.statusErrorCode = Constant.CODE_STATUS.ACCESS_TOKEN_INVALID;
        responseObj.errorsObject = message.ACCESS_TOKEN_INVALID;
        responseObj.errorsMessage = message.ACCESS_TOKEN_INVALID.message;
        res.send(responseObj);
    }else{
        var province_id = isNaN(req.body.province_id)? 0 : parseInt(req.body.province_id);

        districtDao.findAllByField(Constant.TABLE_NAME_DB.DISTRICT.NAME_FIELD_PROVINCE_ID, province_id).then(function(data){
            responseObj.statusErrorCode = Constant.CODE_STATUS.SUCCESS;
            responseObj.results = data;
            res.send(responseObj);
        }, function(err){
            responseObj.statusErrorCode = Constant.CODE_STATUS.DB_EXECUTE_ERROR;
            responseObj.errorsObject = err;
            responseObj.errorsMessage = message.DB_EXECUTE_ERROR.message;
            res.send(responseObj);
        });
    }
};

var getAllWardByDistrict = function(req, res){
    var responseObj = new ResponseServerDto();
    var accessTokenObj = req.accessTokenObj;

    if(!accessTokenObj){
        responseObj.statusErrorCode = Constant.CODE_STATUS.ACCESS_TOKEN_INVALID;
        responseObj.errorsObject = message.ACCESS_TOKEN_INVALID;
        responseObj.errorsMessage = message.ACCESS_TOKEN_INVALID.message;
        res.send(responseObj);
    }else{
        var district_id = isNaN(req.body.district_id)? 0 : parseInt(req.body.district_id);

        wardDao.findAllByField(Constant.TABLE_NAME_DB.WARD.NAME_FIELD_DISTRICT_ID, district_id).then(function(data){
            responseObj.statusErrorCode = Constant.CODE_STATUS.SUCCESS;
            responseObj.results = data;
            res.send(responseObj);
        }, function(err){
            responseObj.statusErrorCode = Constant.CODE_STATUS.DB_EXECUTE_ERROR;
            responseObj.errorsObject = err;
            responseObj.errorsMessage = message.DB_EXECUTE_ERROR.message;
            res.send(responseObj);
        });
    }
};

var getLocationData = function(req, res){
    var responseObj = new ResponseServerDto();
    var accessTokenObj = req.accessTokenObj;

    var locationData = {
        provinces : [],
        districts : []
    }

    if(!accessTokenObj){
        responseObj.statusErrorCode = Constant.CODE_STATUS.ACCESS_TOKEN_INVALID;
        responseObj.errorsObject = message.ACCESS_TOKEN_INVALID;
        responseObj.errorsMessage = message.ACCESS_TOKEN_INVALID.message;
        res.send(responseObj);
    }else{
        //var district_id = isNaN(req.body.district_id)? 0 : parseInt(req.body.district_id);

        provinceDao.findAll().then(function(dataPro){
            locationData.provinces = dataPro;
            districtDao.findAll().then(function(data){
                responseObj.statusErrorCode = Constant.CODE_STATUS.SUCCESS;
                locationData.districts = data;
                responseObj.results = locationData;
                res.send(responseObj);
            }, function(err){
                responseObj.statusErrorCode = Constant.CODE_STATUS.DB_EXECUTE_ERROR;
                responseObj.errorsObject = err;
                responseObj.errorsMessage = message.DB_EXECUTE_ERROR.message;
                res.send(responseObj);
            });
        }, function(err){
            responseObj.statusErrorCode = Constant.CODE_STATUS.DB_EXECUTE_ERROR;
            responseObj.errorsObject = err;
            responseObj.errorsMessage = message.DB_EXECUTE_ERROR.message;
            res.send(responseObj);
        });
    }
};

/*Exports*/
module.exports = {
    getAllProvince : getAllProvince,
    getAllDistrictByProvince : getAllDistrictByProvince,
    getAllWardByDistrict : getAllWardByDistrict,
    getLocationData : getLocationData
}