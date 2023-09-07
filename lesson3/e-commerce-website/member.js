const luxon = require('luxon')
class Member {//  5
    constructor(name, birthday, point, homeAddress) {
        this.name = name;
        this.birthday = birthday;
        this.joinedDate = luxon.DateTime.now();
        this.point = point;
        this.homeAddress = homeAddress;
        this.membershipStatus = "Bronze";
    }
}
module.exports = { Member }