const luxon = require("luxon")

const { BookRentingEvent } = require("./book-renting-event");

class Library {
    constructor(name, address, books, maxNumberRenting) {
        this.name = name;
        this.address = address;
        this.books = books;
        this.rentingEvents = [];
        this.maxNumberRentingForGuest = maxNumberRenting;
        this.maxNumberRentingForVIP = this.maxNumberRentingForGuest + 1;
        this.blackList = [];
        this.revenue = 0;
        this.rentedReadingSpace = []
        this.employees = []
        this.printingEvent = []

        setInterval(() => {
            this.checkRentingExceedDuration();
        }, 5000)

        setInterval(() => {
            this.resetBookedSpaces();
        }, 5000)

        setInterval(() => {
            this.resetPrinterUsageList();
        }, 5000)

        setInterval(() => {
            this.demoteRenter();
        }, 10000)

    }
    checkInkRefillPrinter(printer) {
        if (printer.usage == 200) {
            this.revenue -= 50;
            console.log(printer.name + " has been refilled with ink.")
        } else {
            console.log(printer.name + " still has ink.")
        }

    }
    resetPrinterUsageList() {
        this.printingEvent = [];
    }
    usePrinter(renter, printer) {
        // const startDay = luxon.DateTime.now().startOf('day');
        // const endDay = luxon.DateTime.now().endOf('day');
        let countPrinterUsage = 0;
        for (let i = 0; i < this.printingEvent.length; i++) {
            if (this.printingEvent[i] == renter) {
                countPrinterUsage++;
            }
        }
        if (!renter.isVIP) {
            if (countPrinterUsage < 2) {
                this.revenue += 5;
                this.printingEvent.push(renter);
                printer.usage += 1;
            } else {
                throw new Error("You have reached your limit of Printer usage today.")
            }
        } else {
            printer.usage += 1;
        }
    }
    transferVIPtoAnother(renter1, renter2) {
        if (renter1.isVIP == true && renter2.isVIP == false) {
            renter1.isVIP == false;
            renter2.isVIP == true;
            renter1.promotionDate = undefined;
            renter2.promotionDate = luxon.DateTime.now();
        } else {
            console.log("Condition of VIPs are not sastified.")
        }
    }
    getLatestRentingEventByRenter(renter) {
        let minDiffDays = 1e12;
        let minIndex = -1;
        for (let i = 0; i < this.rentingEvents.length; i++) {
            if (this.rentingEvents[i].renter == renter) {
                const diffRenter = luxon.Interval.fromDateTimes(this.rentingEvents[i].rentedDate, luxon.DateTime.now())
                const diffDaysRenter = diffRenter.length('days')
                if (diffDaysRenter < minDiffDays) {
                    minDiffDays = diffDaysRenter;
                    minIndex = i
                }
            }
        }
        try {
            return this.rentingEvents[minIndex]
        } catch (e) {
            console.log("There is no record of " + renter.name)
        }
    }

    hire(employee) {
        this.employees.push(employee)
    }
    resetBookedSpaces() {
        for (let i = 0; i < this.rentedReadingSpace.length; i++) {
            if (this.rentedReadingSpace[i].rentedDate.getFullYear() === luxon.DateTime.now().getFullYear() &&
                this.rentedReadingSpace[i].rentedDate.getMonth() === luxon.DateTime.now().getMonth() &&
                this.rentedReadingSpace[i].rentedDate.getDate() === luxon.DateTime.now().getDate()) {
                this.rentedReadingSpace.splice(i, 1)
            }
        }
    }
    rentSpace(readingSpace) {
        for (let i = 0; i < this.rentedReadingSpace.length; i++) {
            if (this.rentedReadingSpace == readingSpace) {
                throw new Error("This space has been taken.")
            } else {
                this.rentedReadingSpace.push(readingSpace)
                this.revenue += readingSpace.cost;
            }
        }
    }
    getCurrentRentedBooksByRenter(renter) {
        let currentRentedBooks = []
        for (let i = 0; i < this.rentingEvents.length; i++) {
            if (this.rentingEvents[i].renter == renter && this.rentingEvents[i].isReturned == false) {
                currentRentedBooks.push(this.rentingEvents[i])
            }
        }
        return currentRentedBooks;
    }

    getRentedBooks(renter) {
        let rentedBooks = []
        for (let i = 0; i < this.rentingEvents.length; i++) {
            if (this.rentingEvents[i].renter == renter && this.rentingEvents[i].isReturned == true) {
                rentedBooks.push(this.rentingEvents[i])
            }
        }
        return rentedBooks;
    }
    getNewBook(book) {
        this.books.push(book);
    }
    getNumberofBooks() {
        return this.books.length;
    }
    searchTitle(title) {
        for (let i = 0; i < this.books.length; i++) {
            if (this.books[i].title == title) {
                return this.books[i];
            }
        }
        return null;
    }
    searchCategory(category) {
        let bookListCategory = []
        for (let i = 0; i < this.books.length; i++) {
            if (this.books[i].category == category) {
                bookListCategory.push(this.books[i])
            }
        }
        return bookListCategory;
    }
    searchPublisher(publisher) {
        let bookListPublisher = []
        for (let i = 0; i < this.books.length; i++) {
            if (this.books[i].publisher == publisher) {
                bookListPublisher.push(this.books[i])
            }
        }
        return bookListPublisher;
    }
    countBooksByCategory() {
        let booksByCategory = {};
        for (let i = 0; i < this.books.length; i++) {
            let count = 0;
            for (let j = 0; j < this.books.length; j++) {
                if (this.books[i].category == this.books[j].category) {
                    count++;
                }
            }
            booksByCategory[this.books[i].category] = count;
        }
        return booksByCategory;
    }

    isRentedDurationEligible(isVIP, duration) {
        if (isVIP) {
            if (duration > 30) {
                return false
            } else {
                return true;
            }
        } else {
            if (duration > 20) {
                return false;
            } else {
                return true;
            }
        }
    }

    proceedRenting(renter, book, duration) {
        // Renting
        const existedEventIndex = this.rentingEvents.findIndex((element) => element.book == book && element.renter == renter)
        if (existedEventIndex >= 0) {
            this.rentingEvents[existedEventIndex].isReturned = false;
            this.rentingEvents[existedEventIndex].rentedDate = luxon.DateTime.now();
            this.rentingEvents[existedEventIndex].duration = duration;
        }
        else {
            const event = new BookRentingEvent(book, renter, luxon.DateTime.now(), duration)
            this.rentingEvents.push(event)
        }
        this.revenue += 5;
    }

    rentBook(renter, book, duration) {
        // below is code for renting book with max 1 book at a time
        /*const isRenterRented = this.rentingEvents.find((element) => element.renter == renter) != undefined;
        const isBookRented = this.rentingEvents.find((element) => element.book == book) != undefined;
        if (isRenterRented || isBookRented) {
            throw new Error(renter.name + " cannot rent " + book.title)
        } else {
            const event = new BookRentingEvent(book, renter, luxon.DateTime.now(), duration)
            this.rentingEvents.push(event)
        }*/
        const isRenterInBlackList = this.blackList.find((element) => element == renter) == true;
        if (isRenterInBlackList) {
            throw new Error(renter.name + " is in Black List.")
        }

        const isRentingDurationEligble = this.isRentedDurationEligible(renter.isVIP, duration);

        if (isRentingDurationEligble == false) {
            throw new Error('Unable to rent because of invalid duration!');
        }

        const isBookCurrentlyRented = this.rentingEvents.find((element) => element.book == book && element.isReturned == false) != undefined;

        // below is code for renting book with max n times book at a time
        let numberOfRentingBooks = this.getCurrentRentedBooksByRenter(renter).length;

        let maxNumberOfRenting;
        if (renter.isVIP) {
            maxNumberOfRenting = this.maxNumberRentingForVIP;
        } else {
            maxNumberOfRenting = this.maxNumberRentingForGuest;
        }

        if (numberOfRentingBooks >= maxNumberOfRenting || isBookCurrentlyRented || book.isCracked == true) {
            throw new Error(renter.name + " cannot rent " + book.title)
        } else {
            this.proceedRenting(renter, book, duration)
        }
    }
    returnBook(renter, book, isCracked) {
        const rentingIndex = this.rentingEvents.findIndex((element) => element.book == book && element.renter == renter)
        if (rentingIndex >= 0) {
            this.rentingEvents[rentingIndex].isReturned = true;
            this.promoteRenter(renter)
            this.rentingEvents[rentingIndex].book.isCracked = isCracked;
            if (isCracked) {
                this.repairBook(this.rentingEvents[rentingIndex].book);
            }
        } else {
            throw new Error("There is no records!")
        }
    }

    getRenters() {
        const renters = [];
        for (let i = 0; i < this.rentingEvents.length; i++) {
            if (renters.find((renter) => this.rentingEvents[i].renter == renter) !== undefined) {
                renters.push(this.rentingEvents[i].renter)
            }
        }
        return renters;
    }

    demoteRenter() {
        for (let i = 0; i < this.getRenters().length; i++) {
            if (this.renter[i].isVIP) {
                const promotionDate = this.renters[i].promotionDate.toMillis();
                const promotionEndDate = this.renters[i].promotionDate.plus({ years: 1 }).toMillis();
                const rentingEventInThisYear = this.rentingEvents.findIndex((event) => event.renter == this.renters[i] && (event.rentedDate.toMillis() < promotionEndDate && event.rentedDate.toMillis() > promotionDate))

                if (rentingEventInThisYear === undefined) {
                    this.rentingEvents[rentingEventInThisYear].renter.isVIP = false;
                }
            }
        }
    }
    promoteRenter(renter) {
        const diffVIP = luxon.Interval.fromDateTimes(renter.promotionDate, luxon.DateTime.now())
        const diffYearVIP = diffVIP.length('year')
        if (renter.isVIP && diffYearVIP <= 1) {
            expiredDate = renter.promotionDate.plus({ years: 1 })
        }
        let numberOfRentedBooks = this.getRentedBooks(renter).length;
        if (numberOfRentedBooks >= 5) {
            renter.isVIP = true;
            renter.promotionDate = luxon.DateTime.now();
        }
    }
    repairBook(book) {
        book.isCracked = false;
        console.log(book.title + " has been repaired.")
        this.revenue -= 10;
    }

    getTotalRevenue() {
        return this.revenue;
    }

    checkRentingExceedDuration() {
        for (let i = 0; i < this.rentingEvents.length; i++) {
            const diff = luxon.Interval.fromDateTimes(this.rentingEvents[i].rentedDate, luxon.DateTime.now())
            const diffDays = diff.length('day')
            if (diffDays > this.rentingEvents[i].duration) {
                if (this.rentingEvents[i].renter.isVIP == true) {
                    this.rentingEvents[i].renter.isVIP = false
                } else {
                    this.blackList.push(this.rentingEvents[i].renter)
                }
            }
        }

        // let projects = []
        // for (let i = 0; i < this.projects.length; i++) {
        //     const diff = luxon.Interval.fromDateTimes(this.projects[i].startDate, this.projects[i].endDate);
        //     const diffDays = diff.length('days')
        //     console.log(diffDays)
        //     if (diffDays > 20) {
        //         projects.push(this.projects[i])
        //     }
        // }
        // return projects;
    }
}

module.exports = { Library }