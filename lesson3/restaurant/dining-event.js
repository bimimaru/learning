const luxon = require('luxon');
class DiningEvent {
    constructor(guest, numberOfGuest, dishes, rateMeal) {
        this.guest = guest;
        this.numberOfGuest = numberOfGuest;
        this.invoice;
        this.invoiceDate = luxon.DateTime.now();
        this.dishes = dishes;
        this.rateMeal = rateMeal;
    }

    setInvoice(invoice) {
        this.invoice = invoice;
    }
}
module.exports = { DiningEvent }