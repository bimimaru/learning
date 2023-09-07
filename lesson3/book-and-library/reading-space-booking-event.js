class CoReadingSpaceBookingEvent {
    constructor(renter, space, bookedDate) {
        this.renter = renter;
        this.space = space;
        this.bookedDate = bookedDate;
    }
}
module.exports = { CoReadingSpaceBookingEvent }