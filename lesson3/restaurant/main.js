const { Dish } = require("./dish")
const { Restaurant } = require("./restaurant")
const { Guest } = require("./guest")
const { Employee } = require("./employee")
const luxon = require("luxon")
const { DiningEvent } = require("./dining-event")

const comtam = new Restaurant("Com Tam", "103 HTK", "Com Tam for real!")

const nu = new Employee("Nu", "0310", "manager")
const bim = new Employee("Bim", "0702", "chef")
const to = new Employee("To", "0812", "waiter")

const comSuon = new Dish("Com Tam Suon", 20, "com, suon")
const comSuonTrung = new Dish("Com Tam Suon Trung", 25, "com, suon, trung")
const comSuonBi = new Dish("Com Tam Suon Bi", 30, "com, suon, bi")

const mai = new Guest("Mai", "0101", "gmail.com", luxon.DateTime.utc(1965, 1, 1));
const tam = new Guest("Tam", "2105", "gmail.com", luxon.DateTime.utc(2019, 5, 21));
const com = new Guest("Com", "1711", "yahoo.com", luxon.DateTime.utc(2022, 11, 17))

const maiDining = new DiningEvent(mai, 4, [comSuon, comSuonTrung], 8)
const tamDining = new DiningEvent(tam, 5, [comSuonTrung, comSuonBi, comSuonTrung], 9)
const comDining = new DiningEvent(com, 2, [comSuonBi, comSuonTrung], 7)


comtam.addDishToMenu(comSuon)
comtam.addDishToMenu(comSuonTrung)
comtam.addDishToMenu(comSuonBi)
comtam.hire(nu)
comtam.hire(to)
comtam.hire(bim)
comtam.addDiningEvent(maiDining)
comtam.addDiningEvent(tamDining)
comtam.addDiningEvent(comDining)

//console.log(comtam.findBestSellingDish(2));
comtam.removeLeastSellingDish()
comtam.handleGuestHavingMeal(tamDining)
comtam.handleGuestHavingMeal(maiDining)
comtam.handleGuestHavingMeal(comDining)
console.log(comtam.getRevenueEachYear())