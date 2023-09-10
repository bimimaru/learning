//Textbook: id, title, publisher, rentingCost, quantity, numberOfPages
// ReferenceBook: id, title, publisher, rentingCost, quantity, domain, level (1,2,3)
// Novel: id, title, publisher, rentingCost, quantity, author, category
import * as luxon from "luxon";

class Book {
    protected id: string;
    protected title: string;
    protected publisher: string;
    protected rentingCost: number;
    protected quantity: number;
    protected price: number;
    constructor(id: string, title: string, publisher: string, rentingCost: number, quantity: number, price: number) {
        this.id = id;
        this.title = title;
        this.publisher = publisher;
        this.rentingCost = rentingCost;
        this.quantity = quantity;
        this.price = price;
    }
    public getPrice() {
        return this.price;
    }
    public setQuantity(newQuantity: number): number {
        this.quantity = newQuantity;
        return this.quantity;
    }
    public getTitle(): string {
        return this.title;
    }
    public getQuantity(): number {
        return this.quantity;
    }
    public getRentingCost(): number {
        return this.rentingCost;
    }
}

class Textbook extends Book {
    protected numberOfPages: number;
    constructor(id: string, title: string, publisher: string, rentingCost: number, quantity: number, numberOfPages: number, price: number) {
        super(id, title, publisher, rentingCost, quantity, price)
        this.numberOfPages = numberOfPages;
    }
}

class ReferenceBook extends Book {
    protected domain: string;
    protected level: number;
    constructor(id: string, title: string, publisher: string, rentingCost: number, quantity: number, domain: string, level: number, price: number) {
        super(id, title, publisher, rentingCost, quantity, price);
        this.domain = domain;
        this.level = level;
    }
}

class Novel extends Book {
    protected author: string;
    protected category: string;

    constructor(id: string, title: string, publisher: string, rentingCost: number, quantity: number, author: string, category: string, price: number) {
        super(id, title, publisher, rentingCost, quantity, price);
        this.author = author;
        this.category = category;
    }
}

export { Book, Novel, ReferenceBook, Textbook }
