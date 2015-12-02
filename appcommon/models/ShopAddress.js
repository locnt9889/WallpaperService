/**
 * Created by LocNT on 8/15/15.
 */

function ShopAddress(){
    this.shopID = 0;
    this.street = "";
    this.id = 0;
    this.phone = "";
    this.isMap = 1;
    this.longtitude = 0.0;
    this.latitude = 0.0;
    this.isActive = 1;
    this.createdDate =  new Date();
    this.modifiedDate = new Date();
};

module.exports = ShopAddress;
