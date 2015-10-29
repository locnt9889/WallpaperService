/**
 * Created by LocNT on 8/15/15.
 */

function Category(){
    this.categoryID = 0;
    this.shopID = 0;
    this.categoryName = "";
    this.categoryDesc = "";
    this.isActive = 1;
    this.createdDate =  new Date();
    this.modifiedDate = new Date();
    this.isShow = 1;
    this.coverImage = "";
};

module.exports = Category;
