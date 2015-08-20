/**
 * Created by LocNT on 8/15/15.
 */

function UserUpdateDTO(){
    this.iShowEmail = false;
    this.fullName = "";
    this.dateOfBirth = "0000-00-00 00:00:00";
    this.gender = "MALE"
    this.phoneNumber = "";
    this.isShowPhoneNumber = false;
    this.modifiedDate = new Date();
};

module.exports = UserUpdateDTO;
