// CartItem is a class that describe each item in a cart. CartItem should
// have properties: product, quantity, note

import { Product } from "./product";

export class CartItem {
    private product: Product
    private quantity: number
    private note: string
    private total: number
    constructor(product: Product, quantity: number, note: string) {
        this.product = product;
        this.quantity = quantity;
        this.note = note;
        this.total = product.getPrice() * quantity;
    }
    getTotal() {
        return this.total;
    }
    getProduct() {
        return this.product;
    }
    getQuantity() {
        return this.quantity;
    }
    setQuantity(quantity: number) {
        this.quantity = quantity;
        return this.quantity;
    }
}