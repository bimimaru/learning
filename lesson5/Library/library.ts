import { Books, Novel, ReferenceBook, Textbook } from "./books";
import { Guest, Member, PermanentMember } from "./member";
import * as luxon from "luxon";
import { RentingEvent } from "./renting-event";

class Library {
    private name: string
    private address: string
    private books: Books[]
    private members: Member[]
    private events: RentingEvent[]

    constructor(name: string, address: string) {
        this.name = name;
        this.address = address;
        this.books = []
        this.members = []
        this.events = []
        setInterval((): void => {
            this.checkMembershipExpiry()
        }, 2000);
    }

    getEvent() {

    }

    // addEvent(event: RentingEvent) {
    //     this.events.push(event)
    //     return this.events;
    // }

    getBestRenter(n: number) {
        let result: any = {}


        return result
    }

    rentBook(event: RentingEvent) {//8+9 +13
        const rentingCost = event.book.getRentingCost() * event.quantity;

        if (event.member.getDeposit() < rentingCost) {
            throw new Error("You do not have enough deposite to rent this book.")
        }
        let foundBookIndex = this.books.findIndex((element) => element == event.book)
        if (foundBookIndex == -1 || this.books[foundBookIndex].getQuantity() - event.quantity == 0) {
            throw new Error("There is no available book for rent.")
        } else {
            const foundBook = this.books[foundBookIndex]

            foundBook.setQuantity(foundBook.getQuantity() - event.quantity)
            if (event.member instanceof PermanentMember) { //11
                if (event.member.isVIP) {//13
                    let discountCost = rentingCost - rentingCost * 0.15

                    event.member.setDeposit(event.member.getDeposit() - discountCost)
                    event.member.setPaid(event.member.getPaid() + discountCost)
                    this.events.push(event)
                } else {
                    let discountCost = rentingCost - rentingCost * 0.1

                    event.member.setDeposit(event.member.getDeposit() - discountCost)
                    event.member.setPaid(event.member.getPaid() + discountCost)
                    this.events.push(event)
                }
            } else {
                event.member.setDeposit(event.member.getDeposit() - rentingCost)
                event.member.setPaid(event.member.getPaid() + rentingCost)
                this.events.push(event)
            }
        }
    }

    // Rollback Transaction
    balanceAccount(member: Member, amount: number) {
        member.setDeposit(member.getDeposit() - amount);
        member.setPaid(member.getPaid() + amount);
    }

    promoteMember() {//13
        for (let i = 0; i < this.members.length; i++) {
            if (this.members[i] instanceof PermanentMember && this.members[i].getPaid() >= 300) {
                (this.members[i] as PermanentMember).setVIP(true)
            }
        }
    }

    renewMembership(member: Member) {//12
        if (member instanceof PermanentMember) {
            let diff = luxon.Interval.fromDateTimes(member.getExpiredAt(), luxon.DateTime.now())
            let diffDay = diff.length('days')
            if (diffDay > 30) {
                member.setEnable(false);
                member.setExpiredAt(luxon.DateTime.now())
            } else {
                if (member.getDeposit() > 10) {
                    member.setExpiredAt(member.getExpiredAt().plus({ year: 1 }))
                    member.setPaid(member.getPaid() + 10)
                    member.setDeposit(member.getDeposit() - 10)
                }
            }
        }
    }

    addMember(member: Member) {
        this.members.push(member);
        return this.members;
    }

    checkMembershipExpiry() {//6
        for (let i = 0; i < this.members.length; i++) {
            let diff = luxon.Interval.fromDateTimes(this.members[i].getCreateAt(), luxon.DateTime.now())
            let diffYear = diff.length('years')
            if (diffYear > 1) {
                this.members[i].setEnable(false);
            }
        }
    }

    public addBooks(book: Books): Books[] { //2
        this.books.push(book)
        return this.books;
    }

    public getNumberOfBooks(): number { //3
        let count = 0;
        for (let i = 0; i < this.books.length; i++) {
            count += this.books[i].getQuantity();
        }
        return count;
    }

    public getNumberOfDistinctBooks(): object { //4
        let foundBooks: any = {}
        //{ [key: string]: number } = {}
        for (let i = 0; i < this.books.length; i++) {
            let count: number = 0;
            for (let j = 0; j < this.books.length; j++) {
                if (this.books[i].getTitle() == this.books[j].getTitle()) {
                    count++;
                }
            }
            foundBooks[this.books[i].getTitle()] = count;
        }
        return foundBooks;
    }

    public getNumberOfBooksByType(): object {//5
        const foundBooks: any = {
            "Textbook": 0,
            "Novel": 0,
            "ReferenceBook": 0
        }
        for (let i = 0; i < this.books.length; i++) {
            if (this.books[i] instanceof Textbook) {
                foundBooks['Textbook'] += 1;
            }
            else if (this.books[i] instanceof Novel) {
                foundBooks["Novel"] += 1;
            }
            if (this.books[i] instanceof ReferenceBook) {
                foundBooks["ReferenceBook"] += 1;
            }
        }
        return foundBooks;
    }
}
export { Library }