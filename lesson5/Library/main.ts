import { Books } from "./books";
import { Library } from "./library";
import { ReferenceBook } from "./books";
import { Novel } from "./books";
import { Textbook } from "./books";
import { Guest, Member } from "./member";
import { PermanentMember } from "./member";
import * as luxon from "luxon";
import { RentingEvent } from "./renting-event";
import { CoSpaceService, PrintingService, RentingHeadphoneService } from "./service";

const twilight = new Novel("TL01", "Twilight part 1", "USA", 10, 5, "Stephenie Meyer", "Fictional")
const sherlock = new Novel("SH07", "Sherlock Holmes", "UK", 65, 15, "Conan Doyle", "Detective")
const coding = new Textbook("CO02", "Coding For Dummies", "Viet Nam", 30, 12, 200)
const java = new ReferenceBook("JA03", "Java Library", "UK", 45, 4, "", 1)

const to = new Guest("0812", "To", 200)
const bim = new PermanentMember("0702", "Bim", 500)

const toRent = new RentingEvent(to, sherlock, 2)
const bimRent = new RentingEvent(bim, coding, 3)
const bimRent1 = new RentingEvent(bim, sherlock, 4)
const bimRent2 = new RentingEvent(bim, twilight, 2)

const print = new PrintingService("Printing Service", 5)
const headphone = new RentingHeadphoneService("Renting Headphone Service", 20)
const coSpace = new CoSpaceService("CoSpace Service", 50)

const library = new Library("Library", "103 HTK", [print, headphone, coSpace]);

library.addBooks(twilight)
library.addBooks(sherlock)
library.addBooks(coding)
library.addBooks(java)

library.addMember(to)
library.addMember(bim)

// console.log(library.getNumberOfBooks())
// console.log(library.getNumberOfDistinctBooks())
// console.log(library.getNumberOfBooksByType())

library.rentBook(toRent)
library.rentBook(bimRent)
library.rentBook(bimRent1)
library.rentBook(bimRent2)

console.log(library.getBestRenter(2))
console.log(library.getBookByTypeAndThresholds(35, 70))

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
try {
    library.memberCoSpace(to)
} catch (e) {
    console.log(e)
}
library.memberHeadPhone(bim)


console.log(library.getRevenue())
console.log(library.getMostUsedService())
