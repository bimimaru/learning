import { Book } from "./books";
import { Member } from "./member";
import * as luxon from "luxon";


class CharityEvent {//28
    private member: Member
    private donatedBooks: Book[]
    private donatedDate: luxon.DateTime
    constructor(member: Member, books: Book[]) {
        this.member = member;
        this.donatedBooks = books;
        this.donatedDate = luxon.DateTime.now()
    }
    getDonatedDate() {
        return this.donatedDate;
    }
    getMember() {
        return this.member;
    }
    getBooks() {
        return this.donatedBooks;
    }
}

export { CharityEvent }