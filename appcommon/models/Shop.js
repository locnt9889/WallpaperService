/**
 * Created by LocNT on 8/15/15.
 */

function Shop(){
    this.shopID = 0;
    this.userID = 0;
    this.shopName = "";
    this.shopDesc = "";
    this.shopStatus =  0;
    this.avatarImageURL = "";
    this.coverImageURL =  "";
    this.phoneNumber = "";
    this.countryCode = 0;
    this.isShowPrice = 1;
    this.isCanOrder =  1;
    this.isCloseShop = 0;
    this.closeShopMessage = "";
    this.viewCountNumber = 0;
    this.isActive = 1;
    this.createdDate =  new Date();
    this.modifiedDate = new Date();
};

module.exports = Shop;
