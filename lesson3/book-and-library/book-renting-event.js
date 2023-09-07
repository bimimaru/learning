
class BookRentingEvent {
    constructor(book, renter, rentedDate, duration) {
        this.book = book;
        this.renter = renter;
        this.rentedDate = rentedDate;
        this.duration = duration;
        this.isReturned = false;
    }
}
module.exports = { BookRentingEvent }