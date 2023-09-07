const luxon = require("luxon")
class Renter {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.isVIP = false;
        this.promotionDate = undefined;
    }

}
module.exports = { Renter }