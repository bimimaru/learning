import { Book } from "./books";
import { Member } from "./member";
import * as luxon from "luxon";


class CharityEvent {//28
    private member: Member
    private donatedBook: Book
    private donatedDate: luxon.DateTime
    private quantity: number
    constructor(member: Member, books: Book, quantity: number) {
        this.member = member;
        this.donatedBook = books;
        this.donatedDate = luxon.DateTime.now()
        this.quantity = quantity
    }
    getQuantity() {
        return this.quantity;
    }
    getDonatedDate() {
        return this.donatedDate;
    }
    getMember(): Member {
        return this.member;
    }
    getBook() {
        return this.donatedBook;
    }

    getDonationValue() {
        return this.quantity * this.getBook().getPrice();
    }
}

export { CharityEvent }