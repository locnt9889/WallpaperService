/**
 * Created by LocNT on 8/15/15.
 */

function ShopAddressUpdateDto(){
    this.street = "";
    this.phone = "";
    this.isMap = 1;
    this.longtitude = 0.0;
    this.latitude = 0.0;
    this.modifiedDate = new Date();
};

module.exports = ShopAddressUpdateDto;
