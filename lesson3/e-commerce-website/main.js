const luxon = require('luxon')
const { Cart } = require('./cart')
const { CartItems } = require('./cartItems')
const { Member } = require('./member')
const { Product } = require('./product')
const { Website } = require('./website')
const { Promotions } = require('./promotions')
const { Company } = require('./company')

const aj = new Website("Arthur & Jamie", luxon.DateTime.utc(2023, 8, 29), 1, "Work til you die", "103 HTK")

const bs20 = new Promotions('BS20', 'membership', 0.2, 'BS20', ['Bronze', 'Silver'])
const birthday = new Promotions("Birthday10", 'birthday', 0.1, 'BD01')
const threshold = new Promotions("100Threshold500", 'threshold', 0.1, "TH01", undefined, 100, 500)
const categoryPromotion = new Promotions("Diary10", 'category', 0.05, "CATE01", undefined, undefined, undefined, 'diary')
const macPromotion = new Promotions("Macbook10", "product", 0.1, "MAC01", undefined, undefined, undefined, undefined, "Macbook")

const to = new Member("To", luxon.DateTime.utc(2000, 12, 8), 0, "abd")
const bim = new Member("Bim", luxon.DateTime.utc(1991, 7, 2), 0, "sss")

const laptop = new Product("Macbook", "Apple", "electronic", 3000, 12)
const mouse = new Product("Mouse", "Gamer", "electronic", 200, 10)
const keyboard = new Product("Keyboard", "Samsung", "electronic", 400, 5)
const coke = new Product("Cocacola", "Cocacola", "Drinks", 10, 50)
const milk = new Product("Milk A2", "A2", "diary", 250, 8)

const toChooseLaptop = new CartItems(laptop, 2, 'Brand new');
const toChooseMouse = new CartItems(mouse, 1, "good")
const toChooseKeyboard = new CartItems(keyboard, 4, "pretty")

const bimChooseLaptop = new CartItems(laptop, 5, "ok")
const bimChooseCoke = new CartItems(coke, 5, "cold")
const bimChooseMilk = new CartItems(milk, 2, "tin")

const a2 = new Company("A2", "milk", "aaa")
const apple = new Company("Apple", "", "usa")

aj.addProductToList(laptop)
aj.addProductToList(mouse)
aj.addProductToList(keyboard)
aj.addProductToList(coke)
aj.addProductToList(milk)

aj.addPromotion(bs20)
aj.addPromotion(birthday)
aj.addPromotion(threshold)
aj.addPromotion(categoryPromotion)
aj.addPromotion(macPromotion)

aj.addToCooperations(a2)
aj.addToCooperations(apple)

/**
 * DATA INITIALIZATION
 */
//aj.removeProduct(mouse)

//aj.searchProductByName("Macbook")
//aj.searchProductsByCategory("electronic")

/**
 * To add to cart 1st
 */
aj.addToCartList(to, toChooseLaptop)
aj.addToCartList(to, toChooseMouse)
try {
    aj.proceedPayment(to);
} catch (e) {
    console.log(e)
}
//console.log(aj.products)
console.log(to.point, to.membershipStatus)
//aj.searchTransactionsByCustomer(to)
//aj.searchtransactionsByDay(luxon.DateTime.utc(2023, 8, 30), luxon.DateTime.utc(2023, 9, 1))

/**
 * To add to cart 2nd
 */
aj.addToCartList(to, toChooseLaptop)
aj.proceedPayment(to)
console.log(to.point, to.membershipStatus)

/** 
 * To add to cart 3rd
 */
aj.addToCartList(to, toChooseKeyboard)
aj.proceedPayment(to)
console.log(to.point, to.membershipStatus)

/**
 * Bim add to cart 1st
 */
aj.addToCartList(bim, bimChooseLaptop)
aj.adjustQuantityInCart(bim, bimChooseLaptop, 6)
aj.addToCartList(bim, bimChooseCoke)

aj.removeCartItemFromCart(bim, bimChooseCoke)
aj.proceedPayment(bim)
console.log(bim.point, bim.membershipStatus)

aj.addToCartList(bim, bimChooseMilk)
aj.proceedPayment(bim)

console.log(aj.getBestSellingItems(2))

aj.getProductByCategoryAndThreshold("electronic", 200, 1000)

aj.getProductOfferedPromotion()









