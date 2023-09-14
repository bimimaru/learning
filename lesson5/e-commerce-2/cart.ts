// A member can add a product to their cart. Cart is a class has properties:
// user, cartItems (cartItems is a list of cartItem), total


import { CartItem } from "./cartItem";
import { User } from "./user"

export class Cart {
    private cartItems: CartItem[]
    private user: User
    private total: number
    private transactionDate: luxon.DateTime | undefined
    constructor(user: User) {
        this.cartItems = [];
        this.user = user;
        this.total = 0;
        this.transactionDate = undefined;
    }
    getTransactionDate(): luxon.DateTime | undefined {
        return this.transactionDate;
    }
    setTransactionDate(date: luxon.DateTime) {
        this.transactionDate = date;
        return this.transactionDate;
    }
    setTotal(total: number) {
        this.total = total;
        return this.total;
    }
    getTotal() {
        return this.total;
    }
    getCartItem() {
        return this.cartItems;
    }
    getUser() {
        return this.user;
    }

    public addCartItem(cartItem: CartItem) {
        let productQuantity = cartItem.getProduct().getQuantity()
        let cartItemQuantity = cartItem.getQuantity()
        if (cartItemQuantity <= productQuantity) {
            this.cartItems.push(cartItem)
            this.total += cartItem.countTotal()
            cartItem.getProduct().setQuantity(productQuantity - cartItemQuantity)
        } else {
            console.log("There is not enough available stock.")
        }
    }
}

