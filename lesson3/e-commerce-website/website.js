const luxon = require('luxon')

const { Cart } = require("./cart");
const { Product } = require('./product');

class Website {
    constructor(name, launchedDate, version, slogan, address) {
        this.name = name;
        this.launchedDate = launchedDate;
        this.version = version;
        this.slogan = slogan;
        this.address = address;
        this.products = [];
        this.transactions = [];
        this.carts = [];
        this.revenue = 0;
        this.promotions = []
        this.cooperations = [];
    }
    getProductOfferedPromotion() {//35
        let foundProducts = []

        for (let i = 0; i < this.promotions.length; i++) {
            if (this.promotions[i].type == "category" || this.promotions[i].type == "product") {
                for (let j = 0; j < this.products.length; j++) {
                    if (this.products[j].category == this.promotions[i].applyToCategory || this.products[j].name == this.promotions[i].applyToProduct) {
                        foundProducts.push(this.products[j])
                    }
                }
            }
        }
        return foundProducts;
    }
    getProductByCategoryAndThreshold(category, threshold1, threshold2) {//33
        let foundProducts = []
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].category == category &&
                this.products[i].price >= threshold1 && this.products[i].price <= threshold2) {
                foundProducts.push(this.products[i])
            }
        }
        return foundProducts
    }
    addToCooperations(company) {
        this.cooperations.push(company)
    }

    addPromotion(promotion) {
        this.promotions.push(promotion)
    }

    getBestSellingItems(n) { //21
        let foundSoldProducts = {}
        for (let i = 0; i < this.transactions.length; i++) {
            for (let j = 0; j < this.transactions[i].cartItems.length; j++) {
                const productName = this.transactions[i].cartItems[j].product.name
                if (foundSoldProducts[productName] != undefined) {
                    foundSoldProducts[productName] += this.transactions[i].cartItems[j].quantity;
                } else {
                    foundSoldProducts[productName] = this.transactions[i].cartItems[j].quantity;
                }
            }
        }
        let result = {};
        let maxQuantityIndex = 0;
        for (let i = 0; i < n; i++) {
            let product = Object.keys(foundSoldProducts)
            for (let j = 0; j < product.length; j++) {
                if (foundSoldProducts[product[j]] > foundSoldProducts[product[maxQuantityIndex]]) {
                    maxQuantityIndex = j;
                }
            }
            result[product[maxQuantityIndex]] = foundSoldProducts[product[maxQuantityIndex]]
            delete foundSoldProducts[product[maxQuantityIndex]]
        }
        return result;
    }

    removeCartItemFromCart(guest, cartItem) { //17
        const foundCartIndex = this.carts.findIndex((element) => element.guest == guest)
        const foundCartItemIndex = this.carts[foundCartIndex].cartItems.findIndex((element) => element == cartItem)
        this.carts[foundCartIndex].cartItems.splice(foundCartItemIndex, 1)
    }

    searchtransactionsByDay(startOfPeriod, endOfPeriod) { //11
        const start = startOfPeriod.toMillis()
        const end = endOfPeriod.toMillis()
        let foundTransaction = []
        for (let i = 0; i < this.transactions.length; i++) {
            let paymentDay = this.transactions[i].paymentCompletedDate.toMillis()
            if (paymentDay >= start && paymentDay <= end) {
                foundTransaction.push(this.transactions[i]);
            }
        }
        console.log(foundTransaction)
        return foundTransaction;
    }
    searchTransactionsByCustomer(customer) { //10
        let foundTransaction = []
        for (let i = 0; i < this.transactions.length; i++) {
            if (this.transactions[i].guest == customer) {
                foundTransaction.push(this.transactions[i])
            }
        }
        console.log(foundTransaction)
        return foundTransaction;
    }
    chooseDelivery(cart) {//8
        if (cart.guest.homeAddress != undefined) {
            console.log("Delivery to " + cart.guest.homeAddress)
        } else {
            console.log("Delivery to " + cart.deliveryAddress)
        }
    }
    applyTax(cart) {//18
        for (let i = 0; i < cart.cartItems.length; i++) {
            if (cart.cartItems[i].product.category == "electronic") {
                cart.total += cart.cartItems[i].product.price * cart.cartItems[i].quantity * 0.15
            } else {
                cart.total += cart.cartItems[i].product.price * cart.cartItems[i].quantity * 0.1
            }
        }
        return cart.total;
    }
    proceedPayment(guest) {//7
        const cart = this.carts.find((element) => element.guest == guest);

        //32

        let discounted = false;
        for (let i = 0; i < cart.cartItems.length; i++) {
            for (let j = 0; j < this.cooperations.length; j++) {
                if (cart.cartItems[i].product.brand == this.cooperations[j].name) {
                    cart.total -= cart.total * 0.02;
                    discounted = true;
                    break;
                }
            }
            if (discounted) {
                break;
            }
        }

        for (let i = 0; i < this.promotions.length; i++) {
            cart.applyValidTypedPromotion(this.promotions[i]) //22
        }

        //15
        if (cart.guest.membershipStatus == "Platinum") {
            cart.total -= cart.total * 0.1;
        } else if (cart.guest.membershipStatus == "Gold") {
            cart.total -= cart.total * 0.05;
        } else if (cart.guest.membershipStatus == "Silver") {
            cart.total -= cart.total * 0.02;
        }
        //18
        this.applyTax(cart)
        this.chooseDelivery(cart)

        //9
        cart.paymentCompletedDate = luxon.DateTime.now()
        this.transactions.push(cart)

        //13
        let increasedPoint = Math.floor(cart.total * 0.1)
        cart.guest.point += increasedPoint;

        //14
        this.checkMembership(cart.guest);
        this.resetGuestCarts(cart)

        this.revenue += cart.total;
        return cart.total;

    }
    resetGuestCarts(cart) {
        let index = this.carts.findIndex((element) => element == cart)
        this.carts.splice(index, 1)
    }
    checkMembership(member) { //14
        if (member.point >= 1000 && member.point < 2000) {
            member.membershipStatus = "Silver"
        }
        if (member.point >= 2000 && member.point < 4000) {
            member.membershipStatus = "Gold"
        }
        if (member.point >= 4000) {
            member.membershipStatus = "Platinum"
        }
    }
    adjustQuantityInCart(guest, cartItem, adjustedQuantity) {//16
        const foundCartIndex = this.carts.findIndex((element) => element.guest == guest);

        if (foundCartIndex >= 0) {
            cartItem.product.quantityLeft += cartItem.quantity
            this.carts[foundCartIndex].total -= cartItem.quantity * cartItem.product.price

            if (adjustedQuantity <= cartItem.product.quantityLeft) {
                cartItem.product.quantityLeft -= adjustedQuantity
                this.carts[foundCartIndex].total += adjustedQuantity * cartItem.product.price

                const adjustedCartItem = this.carts[foundCartIndex].cartItems.findIndex((element) => element == cartItem);

                if (adjustedCartItem >= 0) {
                    this.carts[foundCartIndex].cartItems[adjustedCartItem].quantity = adjustedQuantity;
                } else {
                    throw new Error('Cart item not found for this guest!');
                }
            }
        } else {
            throw new Error('Cart not found for this guest!');
        }
    }

    getCartByGuest(guest) {
        return this.carts.find((element) => element.guest == guest);
    }

    addToCartList(guest, cartItem) {//6
        //12
        const foundCartIndex = this.carts.findIndex((element) => element.guest == guest)

        if (foundCartIndex >= 0) {
            this.carts[foundCartIndex].addCartItem(cartItem);
        } else {
            const cart = new Cart(guest);
            cart.addCartItem(cartItem);
            this.carts.push(cart);
        }
    }
    searchProductsByCategory(category) { //4
        let foundProducts = []
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].category == category) {
                foundProducts.push(this.products[i])
            }
        }
        if (foundProducts.length == 0) {
            throw new Error("There's no product in this category: " + category)
        }
        console.log(foundProducts)
        return foundProducts;
    }
    searchProductByName(name) { //3
        let foundProducts = []
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].name == name) {
                foundProducts.push(this.products[i])
            }
        }
        if (foundProducts.length == 0) {
            throw new Error("There's no product with this name: " + name)
        }
        console.log(foundProducts)
        return foundProducts;
    }

    removeProduct(product) {//2
        let index = this.products.findIndex((element) => element == product);
        this.products.splice(index, 1);
    }
    addProductToList(product) { //1 
        this.products.push(product);
    }

}
module.exports = { Website }