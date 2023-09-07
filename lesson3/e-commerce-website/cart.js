const luxon = require("luxon")

class Cart {
    constructor(guest) {
        this.guest = guest;
        this.cartItems = [];
        this.total = 0;
        this.originalTotal = 0;
        this.paymentCompletedDate = undefined;
        this.deliveryAddress = undefined
        this.chooseDefaultAddress = true;
        this.promotions = []
    }
    applyValidTypedPromotion(promotion) {
        if (promotion.isEnable) {
            const isPromotionAlreadyApplied = this.promotions.find((element) => element.code == promotion.code) != undefined
            if (isPromotionAlreadyApplied) {
                return
            }

            let isPromotionValid = false;

            if (promotion.type == "membership") {//26
                for (let i = 0; i < promotion.applyToMemberships.length; i++) {
                    if (promotion.applyToMemberships[i] == this.guest.membershipStatus) {
                        isPromotionValid = true;
                        break;
                    }
                }
            }
            else if (promotion.type == "birthday") {//27
                if (luxon.DateTime.now().day == this.guest.birthday.day &&
                    luxon.DateTime.now().month == this.guest.birthday.month) {
                    isPromotionValid = true;
                }
            }
            else if (promotion.type == "threshold") {//28
                if (this.total >= 100 && this.total <= 500) {
                    isPromotionValid = true;
                }
            }
            else if (promotion.type == "category") {//29
                for (let i = 0; i < this.cartItems.length; i++) {
                    if (this.cartItems[i].product.category == promotion.applyToCategory) {
                        isPromotionValid = true;
                        break;
                    }
                }
            }
            else if (promotion.type == "product") {//34
                for (let i = 0; i < this.cartItems.length; i++) {
                    if (this.cartItems[i].product.name == promotion.applyToProduct) {
                        isPromotionValid = true;
                        break;
                    }
                }
            }

            if (isPromotionValid && (this.total * (1 - promotion.discountValue) / this.originalTotal) > 0.5) {
                this.promotions.push(promotion);
                this.total -= this.total * promotion.discountValue;
            }



            return this.total;
        }
    }

    addCartItem(cartItem) {// 12
        if (cartItem.quantity > cartItem.product.quantityLeft) {
            throw new Error("Sorry, we do not have enough available stock.")
        }
        this.cartItems.push(cartItem);
        cartItem.product.quantityLeft -= cartItem.quantity;
        this.total += cartItem.product.price * cartItem.quantity;
        this.originalTotal = this.total;

    }
}
module.exports = { Cart }