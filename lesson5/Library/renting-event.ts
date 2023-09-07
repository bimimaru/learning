import { Book } from "./books";
import { Guest, Member, PermanentMember } from "./member";
import * as luxon from "luxon";

class RentingEvent {
    public member: Member;
    public book: Book;
    public quantity: number;
    public rentedDate: luxon.DateTime;
    protected expiredDate: luxon.DateTime | undefined;
    protected returnDate: luxon.DateTime | undefined;
    constructor(member: Member, book: Book, quantity: number) {
        this.member = member;
        this.book = book;
        this.quantity = quantity;
        this.rentedDate = luxon.DateTime.now();
        //22
        if (member instanceof Guest) {
            this.expiredDate = this.rentedDate.plus({ day: 10 })
        }
        if (member instanceof PermanentMember && (member as PermanentMember).isVIP == false) {
            this.expiredDate = this.rentedDate.plus({ day: 20 })
        }
        if (member instanceof PermanentMember && (member as PermanentMember).isVIP == true) {
            this.expiredDate = this.rentedDate.plus({ day: 30 })
        }
    }
}

export { RentingEvent }