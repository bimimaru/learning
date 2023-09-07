class Promotions {
    constructor(name, type, discountValue, code, applyToMemberships, minValue, maxValue, applyToCategory, applyToProduct) {
        this.name = name;
        this.type = type;
        this.discountValue = discountValue
        this.code = code;
        this.isEnable = true;
        this.applyToMemberships = applyToMemberships;
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.applyToCategory = applyToCategory;
        this.applyToProduct = applyToProduct;
    }
    setIsEnable(isEnable) {//31
        this.isEnable = isEnable;
    }
}
module.exports = { Promotions }