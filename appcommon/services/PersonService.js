/**
 * Created by LocNT on 7/29/15.
 */

//var MysqlHelperModule = require("../helpers/MysqlHelper");
var personDao = require("../daos/PersonDao");
var Person = require("../models/Person");

var getAllPerson = function(req, res){
    personDao.findAllActive().then(function(data){
        console.log("success");
        res.send(data);
    }, function(err){
        console.log("error");
        res.send(err);
    });
};

var findOneById = function(req, res){
    var id = req.params.id;
    console.log("id : " + id);
    personDao.findOneById(id).then(function(data){
        console.log("success");
        res.send(data);
    }, function(err){
        console.log("error");
        res.send(err);
    });
};

var addNew = function(req, res){
    var person = new Person();
    person.name = "never";
    person.email = "never@gmail.com";
    person.birthday = new Date(1989, 8, 9);
    person.number_card = 186757067;

    personDao.addNew(person).then(function(data){
        console.log("success");
        res.send(data);
    }, function(err){
        console.log("error");
        res.send(err);
    });
};

var update = function(req, res){
    var person = new Object();
    person.name = "never123";
    person.email = "never123@gmail.com";
    person.birthday = new Date(1990, 10, 12);
    person.number_card = 11111111;

    var id = 4;

    personDao.update(person, id).then(function(data){
        console.log("success");
        res.send(data);
    }, function(err){
        console.log("error");
        res.send(err);
    });
};

var inactivate = function(req, res){
    var id = 4;
    personDao.inactivate(id).then(function(data){
        console.log("success");
        res.send(data);
    }, function(err){
        console.log("error");
        res.send(err);
    });
};

var remove = function(req, res){
    var id = 3;
    personDao.remove(id).then(function(data){
        console.log("success");
        res.send(data);
    }, function(err){
        console.log("error");
        res.send(err);
    });
};

/*Exports*/
module.exports = {
    getAllPerson : getAllPerson,
    findOneById : findOneById,
    addNew : addNew,
    update : update,
    inactivate : inactivate,
    remove : remove

}