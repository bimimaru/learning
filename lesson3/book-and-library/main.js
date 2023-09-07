const { Library } = require("./library.js")
const { Book } = require("./book.js")
const { Employee } = require("./employee.js")
const { BookRentingEvent } = require("./book-renting-event.js")
const { CoReadingSpace } = require("./co-reading-space.js")
const { CoReadingSpaceBookingEvent } = require("./reading-space-booking-event.js")
const { Printer } = require("./printer.js")
const { Renter } = require("./renter.js")

const stateLibrary = new Library("State Library", "HCMC Viet Nam", [], 2)


const toRent = new Renter("To", 22)
const bimRent = new Renter("Bim", 32)
const nuRent = new Renter("Nu", 31)

const sherlockHomes = new Book("Sherlock Homes", "Conan Doyle", "British Publisher", 200, "Detective")
const threeKingdoms = new Book("The Three Kingdoms", "Lao Tzu", "China Publisher", 100, "History")
const greekMythology = new Book("The Greek Mythology", "Tatziki", "Greece Publisher", 500, "Mythology")
const harryPotter = new Book("Harry Potter", "J.K Rowling", "British Publisher", 50, "Children")
const lotr = new Book("The Lord of The Rings", "J.R.R Tolkien", "USA Publisher", 1000, "Fiction")

stateLibrary.getNewBook(sherlockHomes);
stateLibrary.getNewBook(threeKingdoms);
stateLibrary.getNewBook(greekMythology);
stateLibrary.getNewBook(lotr);
stateLibrary.getNewBook(harryPotter);

try {
    stateLibrary.rentBook(toRent, sherlockHomes, 20)
} catch (e) {
    console.log(e)
}
try {
    stateLibrary.rentBook(nuRent, sherlockHomes, 20)
} catch (e) {
    console.log(e)
}
try {
    stateLibrary.rentBook(bimRent, lotr, 10)
} catch (e) {
    console.log(e)
}
try {
    stateLibrary.rentBook(toRent, threeKingdoms, 15)
} catch (e) {
    console.log(e)
}
// try {
//     stateLibrary.rentBook(toRent, greekMythology, 40)
// } catch (e) {
//     console.log(e)
// }
stateLibrary.returnBook(bimRent, lotr, false)
stateLibrary.returnBook(toRent, threeKingdoms, true)
stateLibrary.returnBook(toRent, sherlockHomes, false)
try {
    stateLibrary.rentBook(toRent, greekMythology, 20)
} catch (e) {
    console.log(e)
}
try {
    stateLibrary.rentBook(toRent, lotr, 10)
} catch (e) {
    console.log(e)
}
try {
    stateLibrary.returnBook(toRent, greekMythology)
} catch (e) {
    console.log(e)
}

try {
    stateLibrary.returnBook(toRent, lotr, false)
} catch (e) {
    console.log(e)
}
try {
    stateLibrary.rentBook(toRent, harryPotter, 20)
} catch (e) {
    console.log(e)
}
try {
    stateLibrary.returnBook(toRent, harryPotter, false)
} catch (e) {
    console.log(e)
}

console.log(stateLibrary.getCurrentRentedBooksByRenter(toRent))
console.log(toRent)
console.log(stateLibrary.getTotalRevenue())