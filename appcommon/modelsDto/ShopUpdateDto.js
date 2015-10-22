/**
 * Created by LocNT on 8/15/15.
 */

function ShopUpdateDto(){
    this.shopName = "";
    this.shopDesc = "";
    this.phoneNumber = "";
    this.isShowPrice = true;
    this.isCanOrder =  true;
    this.isCloseShop = false;
    this.closeShopMessage = "";
    this.modifiedDate = new Date();
};

module.exports = ShopUpdateDto;
