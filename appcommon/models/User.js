/**
 * Created by LocNT on 8/15/15.
 */

function User(){
    this.userID = 0;
    this.userLevelID = 0;
    this.email = "";
    this.iShowEmail = false;
    this.passWord = "";
    this.fullName = "";
    this.dateOfBirth = "0000-00-00 00:00";
    this.phoneNumber = "";
    this.isShowPhoneNumber = false;
    this.avatarImageURL = "";
    this.coverImageURL = "";
    this.isFacebookAccount = false;
    this.maxShop = 5;
    this.isActive = false;
    this.userStatusID = 0;
    this.createdDate = new Date();
    this.modifiedDate = new Date();
};

module.exports = User;
