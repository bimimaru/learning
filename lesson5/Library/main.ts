import { Book } from "./books";
import { Library } from "./library";
import { ReferenceBook } from "./books";
import { Novel } from "./books";
import { Textbook } from "./books";
import { Guest, Member } from "./member";
import { PermanentMember } from "./member";
import * as luxon from "luxon";
import { RentingEvent } from "./renting-event";
import { CoSpaceService, PrintingService, RentingHeadphoneService } from "./service";
import { CharityEvent } from "./charity";

const twilight = new Novel("TL01", "Twilight part 1", "USA", 10, 5, "Stephenie Meyer", "Fictional", 60)
const sherlock = new Novel("SH07", "Sherlock Holmes", "UK", 65, 15, "Conan Doyle", "Detective", 120)
const coding = new Textbook("CO02", "Coding For Dummies", "Viet Nam", 30, 12, 200, 120)
const java = new ReferenceBook("JA03", "Java Library", "UK", 45, 4, "", 1, 200)
const lotr = new Novel("LO77", "Lord Of The Ring", "UK", 70, 7, "J.R.R.Tolkien", "Fictional", 200)
const baby = new ReferenceBook("BB09", "Putting Babies to Sleep Guide", "Japan", 25, 2, "", 2, 100)

const to = new Guest("0812", "To", 400)
const bim = new PermanentMember("0702", "Bim", 500)
const nu = new PermanentMember("0310", "Nu", 300)
const tam = new Guest("2105", "Tam", 600)

const toRent = new RentingEvent(to, sherlock, 2)
const bimRent = new RentingEvent(bim, coding, 1)
const bimRent1 = new RentingEvent(bim, sherlock, 6)
const bimRent2 = new RentingEvent(bim, twilight, 2)

const print = new PrintingService("Printing Service", 5)
const headphone = new RentingHeadphoneService("Renting Headphone Service", 20)
const coSpace = new CoSpaceService("CoSpace Service", 50)

const library = new Library("Library", "103 HTK", [print, headphone, coSpace]);

const toDonate = new CharityEvent(to, lotr, 2)
const bimDonate = new CharityEvent(bim, sherlock, 10)
const nuDonate = new CharityEvent(nu, baby, 2)
const bimDonate1 = new CharityEvent(bim, lotr, 1)
const tamDonate = new CharityEvent(tam, baby, 10)

library.addBooks(twilight)
library.addBooks(sherlock)
library.addBooks(coding)
library.addBooks(java)

library.addMember(to)
library.addMember(bim)
library.addMember(nu)
library.addMember(tam)

// console.log(library.getNumberOfBooks())
// console.log(library.getNumberOfDistinctBooks())
// console.log(library.getNumberOfBooksByType())

try {
    library.rentBook(toRent)
    library.rentBook(bimRent)
    library.rentBook(bimRent1)
    library.rentBook(bimRent2)
} catch (e) {
    console.log((e as Error).message);
}


library.returnBooks(toRent)
library.returnBooks(bimRent)
//console.log(library.getEvent())
library.transferMember(bimRent2, to)
////console.log(library.getEvent())

//console.log(library.getBestRenter(1))
// console.log(library.getBookByTypeAndThresholds(35, 70))

try {
    library.memberPrint(to)
} catch (e) {
    console.log(e)
}
try {
    library.memberHeadPhone(bim)
} catch (e) {
    console.log(e)
}
// try {
//     library.memberCoSpace(bim)
// } catch (e) {
//     console.log(e)
//}

//console.log(library.getRevenue())
//console.log(library.getMostUsedService())

library.addCharity(toDonate)
library.addCharity(bimDonate)
library.addCharity(bimDonate1)
library.addCharity(nuDonate)
library.addCharity(tamDonate)

library.findTop3Donate();
console.log(bim.isVIP, tam instanceof PermanentMember)
console.log(library.getMember())