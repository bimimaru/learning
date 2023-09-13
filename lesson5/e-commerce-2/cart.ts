// A member can add a product to their cart. Cart is a class has properties:
// user, cartItems (cartItems is a list of cartItem), total


import { CartItem } from "./cartItem";
import { User } from "./user"

export class Cart {
    private cartItems: CartItem[]
    private user: User
    private total: number
    constructor(user: User) {
        this.cartItems = [];
        this.user = user;
        this.total = 0;
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
        if (cartItem.getQuantity() < cartItem.getProduct().getQuantity()) {
            this.cartItems.push(cartItem)
            this.total += cartItem.getQuantity() * cartItem.getProduct().getPrice()
            cartItem.getProduct().setQuantity(-cartItem.getQuantity())
        } else {
            console.log("There is not enough available stock.")
        }
    }

}