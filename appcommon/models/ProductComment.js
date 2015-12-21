/**
 * Created by LocNT on 8/15/15.
 */

var Constant = require("../helpers/Constant");

function ProductComment(){
    this.commentID = 0;
    this.productID = 0;
    this.parent_CommentID = 0;
    this.userID = 0;
    this.isShopComment =  false;
    this.commentValue = "";
    this.commentType = Constant.COMMENT_TYPE.TEXT;
    this.isActive = 1;
    this.createdDate =  new Date();
    this.modifiedDate = new Date();
};

module.exports = ProductComment;
