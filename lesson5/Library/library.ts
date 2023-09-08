import { Book, Novel, ReferenceBook, Textbook } from "./books";
import { Guest, Member, PermanentMember } from "./member";
import * as luxon from "luxon";
import { RentingEvent } from "./renting-event";
import { CoSpaceService, PrintingService, RentingHeadphoneService, Service } from "./service";
import { CharityEvent } from "./charity";

class Library {
  private name: string
  private address: string
  private books: Book[]
  private members: Member[]
  private events: RentingEvent[]
  private revenue: number
  private services: Service[]
  private blackList: Member[]
  private charityList: CharityEvent[]

  constructor(name: string, address: string, services: Service[]) {
    this.name = name;
    this.address = address;
    this.books = []
    this.members = []
    this.events = []
    this.revenue = 0;
    this.blackList = []
    this.services = services;
    this.charityList = []
    setInterval((): void => {
      this.checkMembershipExpiry()
    }, 2000);
    setInterval((): void => {
      this.fineOverduedMember()
    }, 3000);
    setInterval((): void => {
      this.removeCharityAfterAYear()
    }, 3000);
  }
  getBooks() {
    return this.books;
  }

  getEvent() {
    return this.events;
  }

  getRevenue() { //19
    return this.revenue;
  }
  removeCharityAfterAYear() {//29
    for (let i = 0; i < this.charityList.length; i++) {
      let diff = luxon.Interval.fromDateTimes(this.charityList[i].getDonatedDate(), luxon.DateTime.now())
      let diffYear = diff.length("years")
      if (diffYear > 1) {
        this.charityList.splice(i, 1)
      }
    }
  }
  addCharity(charity: CharityEvent) {
    this.charityList.push(charity);
  }

  returnBooks(event: RentingEvent) {//21
    let foundIndex = this.events.findIndex((element) => element == event)
    this.events[foundIndex].returnBook();
    this.events[foundIndex].setStatus("Returned");

    let foundBookIndex = this.books.findIndex((element) => element == event.book)
    this.books[foundBookIndex].setQuantity(this.books[foundBookIndex].getQuantity() + event.quantity)
  }

  getMostUsedService() {//20
    let result: any = {}

    let maxIdx = 0;
    for (let i = 0; i < this.services.length; i++) {
      if (this.services[i].getNumberOfUsed() > this.services[maxIdx].getNumberOfUsed()) {
        maxIdx = i;
      }
    }
    result[this.services[maxIdx].getName()] = this.services[maxIdx].getNumberOfUsed();
    return result;
  }

  memberCoSpace(member: Member) {
    if (this.blackList.find((element) => element == member)) {
      throw new Error(member.getName() + " is currently blocked from all service.")
    } else {
      for (let i = 0; i < this.services.length; i++) {
        if (this.services[i] instanceof CoSpaceService) {
          this.services[i].consume(member);
          this.revenue += this.services[i].getCost()
        }
      }
    }
  }
  memberHeadPhone(member: Member) {
    if (this.blackList.find((element) => element == member)) {
      throw new Error(member.getName() + " is currently blocked from all service.")
    } else {
      for (let i = 0; i < this.services.length; i++) {
        if (this.services[i] instanceof RentingHeadphoneService) {
          this.services[i].consume(member);
          this.revenue += this.services[i].getCost()
        }
      }
    }
  }
  memberPrint(member: Member) {
    if (this.blackList.find((element) => element == member)) {
      throw new Error(member.getName() + " is currently blocked from all service.")
    } else {
      for (let i = 0; i < this.services.length; i++) {
        if (this.services[i] instanceof PrintingService) {
          this.services[i].consume(member);
          this.revenue += this.services[i].getCost()
        }
      }
    }
  }

  getBooksByTypeAndThresholds(threshold1: number, threshold2: number/*type: string*/) { //15
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
        else if (this.books[i] instanceof ReferenceBook) {
          result["ReferenceBook"].push(this.books[i])
        }
      }
    }
    return result;
  }

  getTopNFromBooks(countRentedBooks: any, n: number) {
    let result: any = {}
    let maxQuantityIndex = 0;

    for (let i = 0; i < n; i++) {
      let product = Object.keys(countRentedBooks)
      if (product.length == 0) {
        return result;
      }
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
    let countRentedBooks: any = {};
    const event = this.getEvent();

    for (let i = 0; i < event.length; i++) {
      if (event[i].book instanceof ReferenceBook) {
        const bookTitle = event[i].book.getTitle();
        if (countRentedBooks[bookTitle]) {
          countRentedBooks[bookTitle] += event[i].quantity;
        } else {
          countRentedBooks[bookTitle] = event[i].quantity;
        }
      }
    }
    return countRentedBooks;
  }

  getCountBookOfNovelType() {
    let countRentedBooks: any = {}
    const event = this.getEvent()

    for (let i = 0; i < event.length; i++) {
      if (event[i].book instanceof Novel) {
        const bookTitle = event[i].book.getTitle();
        if (countRentedBooks[bookTitle]) {
          countRentedBooks[bookTitle] += event[i].quantity;
        } else {
          countRentedBooks[bookTitle] = event[i].quantity;
        }
      }
    }
    return countRentedBooks;
  }

  getCountBookOfTextbookType() {
    let countRentedBooks: any = {};
    const event = this.getEvent();

    for (let i = 0; i < event.length; i++) {
      if (event[i].book instanceof Textbook) {
        const bookTitle = event[i].book.getTitle();
        if (countRentedBooks[bookTitle]) {
          countRentedBooks[bookTitle] += event[i].quantity;
        } else {
          countRentedBooks[bookTitle] = event[i].quantity;
        }
      }
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

  discountRentingCost(event: RentingEvent) {
    const notEnoughBalanceMessage = "You do not have enough deposite to rent this book.";
    const rentingCost = event.book.getRentingCost() * event.quantity;

    let rate = 0
    let discountCost = rentingCost - rentingCost * rate

    if (event.member instanceof PermanentMember) { //11
      if (event.member.isVIP) {//13
        rate = 0.15
      } else {
        rate = 0.1
      }
    }
    try {
      event.member.balance(discountCost);
    } catch (e) {
      console.log(notEnoughBalanceMessage);
    }
    this.events.push(event)
    this.revenue += discountCost
  }

  transferMember(event: RentingEvent, member: Member) { //27
    let foundEvent = this.events.find((element) => element == event)
    foundEvent!.setStatus("Transferred")
    let newEvent = new RentingEvent(member, event.book, event.quantity)
    this.events.push(newEvent)
    newEvent.setExpiredDate(event.getExpiredDate()!)
  }

  fineOverduedMember() { //24
    for (let i = 0; i < this.events.length; i++) {
      if (this.events[i].getStatus() == "In Use") {
        let expiredDate = this.events[i].getExpiredDate()
        let member = this.events[i].member
        if (expiredDate) {

          let diff = luxon.Interval.fromDateTimes(expiredDate!, luxon.DateTime.now())
          let diffDay = diff.length("days")

          if (diffDay > 0) {
            if (member.getDeposit() >= 5) {
              member.setDeposit(-5)
            } else {
              member.setEnable(false);
            }
          }

          if (diffDay > 30 && this.events[i].returnBook() == undefined) {
            member.setEnable(false)
            this.events[i].setStatus("Lost")
            this.blackList.push(member)
          }
        }
      }
    }
  }

  checkRentingBookQuantity(event: RentingEvent) { //23
    let maxRentingQuantity = 2
    if (event.member instanceof PermanentMember) {
      if (event.member.isVIP) {
        maxRentingQuantity = 5
      } else {
        maxRentingQuantity = 3
      }
    }
    if (event.quantity > maxRentingQuantity) {
      throw new Error(event.member.getName() + " have exceeded the limit of renting books.")
    }
  }

  reEnableMember(member: Member) {//25
    let checkBlackList = this.blackList.find((element) => element == member)
    if (!checkBlackList && !member.getIsEnabled() && member.getDeposit() >= 20) {
      member.setDeposit(-20);
      member.setEnable(true);
    }
  }

  rentBook(event: RentingEvent) {//8+9 +13
    const unavailableBook = "There is no available book for rent.";
    let checkBlackList = this.blackList.find((element) => element == event.member)

    if (checkBlackList) {
      throw new Error(event.member.getName() + " is currently blocked from all service.")
    } else {

      let foundBookIndex = this.books.findIndex((element) => element == event.book);
      if (foundBookIndex == -1 || this.books[foundBookIndex].getQuantity() < event.quantity) {
        throw new Error(unavailableBook)
      } else {

        try {
          this.checkRentingBookQuantity(event)
        } catch (e) {
          console.log(e)
          return;
        }
        const foundBook = this.books[foundBookIndex]

        this.discountRentingCost(event)
        foundBook.setQuantity(foundBook.getQuantity() - event.quantity)
      }
      this.promoteEligibleMember(event.member)
    }
  }

  // Rollback Transaction
  balanceAccount(member: Member, amount: number) {
    member.setDeposit(member.getDeposit() - amount);
    member.setPaid(member.getPaid() + amount);
  }

  promoteEligibleMember(member: Member) {//13
    if (member instanceof PermanentMember && member.getPaid() >= 300) {
      (member as PermanentMember).setVIP(true)
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
