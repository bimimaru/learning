import { Books } from "./books";
import { Member } from "./member";

class RentingEvent {
    public member: Member;
    public book: Books;
    public quantity: number;
    constructor(member: Member, book: Books, quantity: number) {
        this.member = member;
        this.book = book;
        this.quantity = quantity;
    }
}

export { RentingEvent }