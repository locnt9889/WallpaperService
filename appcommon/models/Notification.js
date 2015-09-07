/**
 * Created by LocNT on 7/29/15.
 */

function Notification(){
    this.id = 0;
    this.userID = 0;
    this.friendID = 0;
    this.message = "";
    this.type = "";
    this.createdDate = new Date();
    this.isSended = false;
};

module.exports = Notification;
