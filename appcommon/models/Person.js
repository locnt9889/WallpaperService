/**
 * Created by LocNT on 7/29/15.
 */

function Person(){
    this.id = 0;
    this.name = "";
    this.email = "";
    this.birthday = new Date();
    this.number_card = 0;
    this.active = 1;
    this.created_date = new Date();
};

module.exports = Person;
