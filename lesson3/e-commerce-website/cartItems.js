class CartItems {
    constructor(product, quantity, note) {
        this.product = product;
        this.quantity = quantity;
        this.note = note;
        this.total = product.price * quantity
    }
}
module.exports = { CartItems }