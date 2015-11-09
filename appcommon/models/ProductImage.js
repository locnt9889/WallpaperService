/**
 * Created by LocNT on 8/15/15.
 */

function ProductImage(){
    this.id = 0;
    this.productID = 0;
    this.imageURLFull = "";
    this.imageDesc = "";
    this.isActive = 1;
    this.createdDate =  new Date();
    this.modifiedDate = new Date();
};

module.exports = ProductImage;
