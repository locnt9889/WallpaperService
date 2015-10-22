/**
 * Created by LocNT on 8/15/15.
 */

function Shop(){
    this.shopID = 0;
    this.userID = 0;
    this.shopName = "";
    this.shopDesc = "";
    this.shopStatusID =  0;
    this.avatarImageURL = "";
    this.coverImageURL =  "";
    this.phoneNumber = "";
    this.countryCode = false;
    this.isShowPrice = true;
    this.isCanOrder =  true;
    this.isCloseShop = false;
    this.closeShopMessage = "";
    this.viewCountNumber = 0;
    this.isActive = 1;
    this.createdDate =  new Date();
    this.modifiedDate = new Date();
};

module.exports = Shop;
