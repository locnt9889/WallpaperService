/**
 * Created by LocNT on 8/15/15.
 */

function UserContact(){
    this.id = 0;
    this.userID = 0;
    this.friendID = 0;
    this.statusID = 0;
    this.createdDate = new Date();
    this.modifiedDate = new Date();
};

module.exports = UserContact;
