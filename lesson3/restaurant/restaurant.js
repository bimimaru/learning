const luxon = require("luxon")

class Restaurant {
    constructor(name, address, slogan) {
        this.name = name;
        this.address = address;
        this.slogan = slogan;
        this.employees = []
        this.menu = []
        this.revenue = 0;
        this.capacity = 100;
        this.diningEvent = []
        setInterval(() => {
            this.dailyReset();
        }, 5000)
        setInterval(() => {
            this.removeOldInvoice();
        }, 5000)
        setInterval(() => {
            this.removeLeastSellingDish();
        }, 5000)
    }
    discountLoyalVIP(guest, invoiceValue) { //20
        const diff = luxon.Interval.fromDateTimes(guest.promoteDate, luxon.DateTime.now())
        const diffYear = diff.length('year')
        if (guest.isVIP == true && diffYear >= 5) {
            invoiceValue -= invoiceValue * 0.15;
        }
        return invoiceValue;
    }
    getNumberOfGuestsEachYear() { // 22
        let guestNumber = {}
        for (let i = 0; i < this.diningEvent.length; i++) {
            let totalNumber = 0;
            for (let j = 0; j < this.diningEvent.length; j++) {
                if (this.diningEvent[i].invoiceDate.year == this.diningEvent[j].invoiceDate.year && this.diningEvent[i].guest != this.diningEvent[j].guest) {
                    totalNumber += this.diningEvent[i].numberOfGuest;
                }
            }
            guestNumber[this.diningEvent[i].invoiceDate.year] = totalNumber
        }
        return guestNumber;
    }

    getRevenueEachYear() { // 21
        let revenueEachYear = {}
        for (let i = 0; i < this.diningEvent.length; i++) {
            let totalInvoice = 0;
            for (let j = 0; j < this.diningEvent.length; j++) {
                if (this.diningEvent[i].invoiceDate.year == this.diningEvent[j].invoiceDate.year) {
                    totalInvoice += this.diningEvent[i].invoice;
                }
            }
            revenueEachYear[this.diningEvent[i].invoiceDate.year] = totalInvoice
        }
        return revenueEachYear;
    }

    getTotalTax() { // 18
        return this.revenue * 0.1;
    }
    removeOldInvoice() { //17
        for (let i = 0; i < this.diningEvent.length; i++) {
            const diff = luxon.Interval.fromDateTimes(this.diningEvent[i].invoiceDate.year, luxon.DateTime.now().year)
            const diffYear = diff.length('year')
            if (diffYear > 1) {
                this.diningEvent.splice(i, 1)
            }
        }
    }
    removeLeastSellingDish() { //16
        const soldDishes = this.getSoldDishes();
        const sellingDishesKeys = Object.keys(soldDishes);
        let minCountDishKey = undefined
        for (let i = 0; i < sellingDishesKeys.length; i++) {
            const key = sellingDishesKeys[i]
            if (minCountDishKey == undefined) {
                minCountDishKey = key;
            }
            if (soldDishes[key] < soldDishes[minCountDishKey]) {
                minCountDishKey = key;
            }
        }
        let minDishIndex = this.menu.findIndex((element) => element.name == minCountDishKey);
        this.menu.splice(minDishIndex, 1);

    }

    getSoldDishes() {
        const sellingDishes = {}
        for (let j = 0; j < this.diningEvent.length; j++) {
            const dishes = this.diningEvent[j].dishes;
            for (let k = 0; k < dishes.length; k++) {
                const dish = dishes[k];
                if (sellingDishes[dish.name] == undefined) {
                    sellingDishes[dish.name] = 1;
                } else {
                    sellingDishes[dish.name] = sellingDishes[dish.name] + 1
                }
            }
        }

        return sellingDishes;
    }

    findBestSellingDish(n) {//13 & 14
        const result = []
        const soldDishes = this.getSoldDishes();

        for (let i = 0; i < n; i++) {
            const sellingDishesKeys = Object.keys(soldDishes)
            let maxCountDishKey = undefined
            for (let i = 0; i < sellingDishesKeys.length; i++) {
                const key = sellingDishesKeys[i]

                if (maxCountDishKey == undefined) {
                    maxCountDishKey = key;
                }

                if (soldDishes[key] > soldDishes[maxCountDishKey]) {
                    maxCountDishKey = key;
                }
            }
            result.push({
                dish: maxCountDishKey,
                occurence: soldDishes[maxCountDishKey]
            });
            delete soldDishes[maxCountDishKey];
        }
        return result;
    }
    addDiningEvent(event) {
        this.diningEvent.push(event)
    }
    dailyReset() {
        this.capacity = 100;
    }
    getDistinctGuest() {
        let distinctGuest = []
        for (let i = 0; i < this.diningEvent.length; i++) {
            if (distinctGuest.find((element) => element == this.diningEvent[i].guest) != undefined) {
                this.distinctGuest.push(this.diningEvent[i].guest)
            }
        }
        return distinctGuest;
    }
    extendOrDemoteVIPs() {// 8 & 9
        const guestList = this.getDistinctGuest()
        for (let i = 0; i < guestList.length; i++) {
            if (this.guestList[i].isVIP == true) {
                const promoteEndDate = this.guestList[i].promoteEndDate.plus({ year: 1 });
                const diff = luxon.Interval.fromDateTimes(promoteEndDate, luxon.DateTime.now())
                const diffYear = diff.length('year')
                if (this.guestList[i].spentAmount >= 500 && diffYear + 1 <= 2) {
                    this.guestList[i].promoteEndDate = promoteEndDate;
                }
                if (this.guestList[i].spentAmount < 500 && luxon.DateTime.now().toMillis() <= promoteEndDate.toMillis()) {
                    this.guestList[i].isVIP = false;
                    this.guestList[i].promoteDate = undefined;
                    this.guestList[i].promoteEndDate = undefined;
                }
            }
        }
    }

    getRevenue() {//10
        return this.revenue;
    }

    hire(employee) {
        this.employees.push(employee)
    }

    getSalary() { //2
        for (let j = 0; j < this.diningEvent.length; j++) {
            if (this.diningEvent[j].rateMeal >= 8 && this.diningEvent[j].rateMeal <= 10) {
                for (let i = 0; i < this.employees.length; i++) {
                    this.employees[i].updateSalaryBasedOnMealCost(this.diningEvent[j].rateMeal)
                }
            }
        }
    }

    addDishToMenu(dish) { //3
        this.menu.push(dish)
    }
    removeDishFromMenu(dish) { //11
        let dishIndex = this.menu.findIndex((element) => element == dish);
        this.menu.splice(dishIndex, 1)
    }

    updateSalaryBasedOnMealCostForEmployees(rating, mealCost) { //5
        for (let i = 0; i < this.employees.length; i++) {
            if (rating >= 8 && rating <= 10) {
                this.employees[i].updateSalaryBasedOnMealCost(mealCost)
            }
        }
    }

    handleGuestHavingMeal(event) { // 4
        if (event.numberOfGuest <= this.capacity) {

            this.capacity -= event.numberOfGuest;

            let mealCost = 0
            for (let i = 0; i < event.dishes.length; i++) {
                mealCost += event.dishes[i].cost;
            }
            this.revenue += mealCost;
            event.setInvoice(mealCost + mealCost * 0.1)

            this.updateSalaryBasedOnMealCostForEmployees(event.rateMeal, mealCost);

            if (event.guest.isVIP) {
                event.setInvoice(event.invoice - event.invoice * 0.08)
            }

            let today = luxon.DateTime.now().get('day')
            let thisMonth = luxon.DateTime.now().get('month')
            for (let i = 0; i < this.diningEvent.length; i++) {
                if (this.diningEvent[i].guest.birthday.get('day') == today && this.diningEvent[i].guest.birthday.get('month') == thisMonth) {
                    event.setInvoice(event.invoice - event.invoice * 0.1)
                }
            }

            this.checkPromoteGuest(event.guest, event.invoice);
            this.discountLoyalVIP(event.guest, event.invoice);

            return event.invoice;
        } else {
            throw new Error("No seats available!")
        }
    }

    checkPromoteGuest(guest, invoiceValue) {
        guest.spentAmount += invoiceValue;
        if (guest.spentAmount >= 5000 && guest.isVIP == false) {
            guest.isVIP = true;
            guest.promoteDate = luxon.DateTime.now();
            guest.promoteEndDate = guest.promoteDate.plus({ year: 1 });
        }
    }
}
module.exports = { Restaurant }