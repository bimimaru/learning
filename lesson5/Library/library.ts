import { Book, Novel, ReferenceBook, Textbook } from "./books";
import { Guest, Member, PermanentMember } from "./member";
import * as luxon from "luxon";
import { RentingEvent } from "./renting-event";
import { CoSpaceService, PrintingService, RentingHeadphoneService, Service } from "./service";

class Library {
  private name: string
  private address: string
  private books: Book[]
  private members: Member[]
  private events: RentingEvent[]
  private revenue: number
  private services: Service[]

  constructor(name: string, address: string, services: Service[]) {
    this.name = name;
    this.address = address;
    this.books = []
    this.members = []
    this.events = []
    this.revenue = 0;
    this.services = services;
    setInterval((): void => {
      this.checkMembershipExpiry()
    }, 2000);
  }
  getEvent() {
    return this.events;
  }

  getRevenue() { //19
    return this.revenue;
  }

  returnBooks(event: Event) {

  }

  getMostUsedService() {//20
    let result: any = {}
    let max = 0
    let name = ""
    for (let i = 0; i < this.services.length; i++) {
      if (this.services[i].getNumberOfUsed() > max) {
        max = this.services[i].getNumberOfUsed()
        name = this.services[i].getName()
      }
    }
    result[name] = max;
    return result;
  }

  memberCoSpace(member: Member) {
    for (let i = 0; i < this.services.length; i++) {
      if (this.services[i] instanceof CoSpaceService) {
        this.services[i].consume(member);
        this.revenue += this.services[i].getCost()
      }
    }
  }

  memberHeadPhone(member: Member) {
    for (let i = 0; i < this.services.length; i++) {
      if (this.services[i] instanceof RentingHeadphoneService) {
        this.services[i].consume(member);
        this.revenue += this.services[i].getCost()
      }
    }

  }
  memberPrint(member: Member) {
    for (let i = 0; i < this.services.length; i++) {
      if (this.services[i] instanceof PrintingService) {
        this.services[i].consume(member);
        this.revenue += this.services[i].getCost()
      }
    }
  }

  getBookByTypeAndThresholds(threshold1: number, threshold2: number) { //15
    let result: any = {
      "Textbook": [],
      "Novel": [],
      "ReferenceBook": []
    }
    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i].getRentingCost() >= threshold1 && this.books[i].getRentingCost() <= threshold2) {
        if (this.books[i] instanceof Textbook) {
          result['Textbook'].push(this.books[i])
        }
        else if (this.books[i] instanceof Novel) {
          result["Novel"].push(this.books[i])
        }
        if (this.books[i] instanceof ReferenceBook) {
          result["ReferenceBook"].push(this.books[i])
        }
      }
    }
    return result;
  }

  getTopNFromBooks(countRentedBooks: any, n: number) {
    let result: any = {}
    let maxQuantityIndex = 0
    for (let i = 0; i < n; i++) {
      let product = Object.keys(countRentedBooks)
      for (let j = 0; j < product.length; j++) {
        if (countRentedBooks[product[j]] > countRentedBooks[product[maxQuantityIndex]]) {
          maxQuantityIndex = j
        }
      }
      result[product[maxQuantityIndex]] = countRentedBooks[product[maxQuantityIndex]]
      delete countRentedBooks[product[maxQuantityIndex]]
    }

    return result;
  }

  getCountBookOfReferenceType() {
    let countRentedBooks: any = {}
    const event = this.getEvent()
    for (let i = 0; i < event.length; i++) {
      let count = 0
      for (let j = 0; j < event.length; j++) {
        if (event[i].book == event[j].book && event[i].book instanceof ReferenceBook) {
          count += event[i].quantity;
        }
      }
      countRentedBooks[event[i].book.getTitle()] = count;
    }

    return countRentedBooks;
  }
  getCountBookOfNovelType() {
    let countRentedBooks: any = {}
    const event = this.getEvent()
    for (let i = 0; i < event.length; i++) {
      let count = 0
      for (let j = 0; j < event.length; j++) {
        if (event[i].book == event[j].book && event[i].book instanceof Novel) {
          count += event[i].quantity;
        }
      }
      countRentedBooks[event[i].book.getTitle()] = count;
    }

    return countRentedBooks;
  }

  getCountBookOfTextbookType() {
    let countRentedBooks: any = {}
    const event = this.getEvent()
    for (let i = 0; i < event.length; i++) {
      let count = 0
      for (let j = 0; j < event.length; j++) {
        if (event[i].book == event[j].book && event[i].book instanceof Textbook) {
          count += event[i].quantity;
        }
      }
      countRentedBooks[event[i].book.getTitle()] = count;
    }

    return countRentedBooks;
  }

  getBestRenter(n: number) { //14
    return {
      "ReferenceBook": this.getTopNFromBooks(this.getCountBookOfReferenceType(), n),
      "Textbook": this.getTopNFromBooks(this.getCountBookOfTextbookType(), n),
      "Novel": this.getTopNFromBooks(this.getCountBookOfNovelType(), n)
    }
  }

  rentBook(event: RentingEvent) {//8+9 +13
    const notEnoughBalanceMessage = "You do not have enough deposite to rent this book.";
    const unavailableBook = "There is no available book for rent.";

    const rentingCost = event.book.getRentingCost() * event.quantity;

    let foundBookIndex = this.books.findIndex((element) => element == event.book);
    if (foundBookIndex == -1 || this.books[foundBookIndex].getQuantity() < event.quantity) {
      throw new Error(unavailableBook)
    } else {
      const foundBook = this.books[foundBookIndex]

      if (event.member instanceof PermanentMember) { //11
        if (event.member.isVIP) {//13
          let discountCost = rentingCost - rentingCost * 0.15

          try {
            event.member.balance(discountCost);
          } catch (e) {
            console.log(notEnoughBalanceMessage);
          }

          this.events.push(event)
          this.revenue += discountCost
        } else {
          let discountCost = rentingCost - rentingCost * 0.1

          try {
            event.member.balance(discountCost);
          } catch (e) {
            console.log(notEnoughBalanceMessage);
          }

          this.events.push(event)
          this.revenue += discountCost
        }
      } else {
        try {
          event.member.balance(rentingCost);
        } catch (e) {
          console.log(notEnoughBalanceMessage);
        }

        this.events.push(event)
        this.revenue += rentingCost
      }

      foundBook.setQuantity(foundBook.getQuantity() - event.quantity)
    }
    this.promoteEligibleMember()
  }

  // Rollback Transaction
  balanceAccount(member: Member, amount: number) {
    member.setDeposit(member.getDeposit() - amount);
    member.setPaid(member.getPaid() + amount);
  }

  promoteEligibleMember() {//13
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
      } else {
        member.renew();
      }
    }
  }

  addMember(member: Member) {
    this.members.push(member);
    return this.members;
  }

  checkMembershipExpiry() {//6
    for (let i = 0; i < this.members.length; i++) {
      if (!this.members[i].getIsEnabled()) {
        let diff = luxon.Interval.fromDateTimes(this.members[i].getCreateAt(), luxon.DateTime.now())
        let diffYear = diff.length('years')
        if (diffYear > 1) {
          this.members[i].setEnable(false);
        }
      }
    }
  }

  public addBooks(book: Book): Book[] { //2
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
    let foundBooks: { [key: string]: number } = {}

    for (let i = 0; i < this.books.length; i++) {

      if (foundBooks[this.books[i].getTitle()]) {
        foundBooks[this.books[i].getTitle()] += this.books[i].getQuantity();
      } else {
        foundBooks[this.books[i].getTitle()] = this.books[i].getQuantity();
      }
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
