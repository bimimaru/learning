class Book {
    constructor(title, author, publisher, price, category) {
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.price = price;
        this.category = category;
        this.isCracked = false;
    }
}
module.exports = { Book }