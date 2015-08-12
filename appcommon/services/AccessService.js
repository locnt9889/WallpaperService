/**
 * Created by LocNT on 7/30/15.
 */

var personAccessDao = new require("../daos/PersonAccessDao");

var checkAccessToken = function(req, res, next){
    personAccessDao.checkAccessToken("qwerty112345").then(function(data){
        console.log("access token correct");
        if(data.length > 0){
            console.log("access token exist");
            req.accessTokenObj = data[0];
            next();
        }else{
            console.log("access token not exist");
            res.send("access token not exist");
        }
    }, function(err){
        console.log("accept denied");
        res.send("accept denied");
    });
};

module.exports = {
    checkAccessToken : checkAccessToken
}