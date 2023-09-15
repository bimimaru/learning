// A member can add a product to their cart. Cart is a class has properties:
// user, cartItems (cartItems is a list of cartItem), total


import * as luxon from "luxon"
import { CartItem } from "./cart-item";
import { User } from "./user"
import { Status } from "./status";

export class Cart {
    private cartItems: CartItem[]
    private user: User
    private total: number
    private transactionDate: luxon.DateTime | undefined
    private status: Status
    constructor(user: User) {
        this.cartItems = [];
        this.user = user;
        this.total = 0;
        this.transactionDate = undefined;
        this.status = Status.inCart
    }
    getStatus() {
        return this.status;
    }
    setStatus(status: Status) {
        this.status = status;
        return this.status;
    }
    getTransactionDate(): luxon.DateTime | undefined {
        return this.transactionDate;
    }
    setTransactionDate(date: luxon.DateTime): luxon.DateTime {
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
    getCartItems() {
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

    public checkout(): number {
        let userMembership = this.user.getMembership();

        if (userMembership == "Silver") {
            this.total -= this.total * 0.02
        } else if (userMembership == "Gold") {
            this.total -= this.total * 0.05;
        } else if (userMembership == "Diamond") {
            this.total -= this.total * 0.1
        }

        this.setTransactionDate(luxon.DateTime.now())
        this.setStatus(Status.paid)

        return this.total;
    }
}

