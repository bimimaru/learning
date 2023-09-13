import { Cart } from "./cart";
import { CartItem } from "./cartItem";
import { MainMarket, Market, SampleMarket } from "./market";
import { Product } from "./product";
import { Regions } from "./regions";
import { User } from "./user";
import { Website } from "./website";
import * as luxon from "luxon"

const aj = new Website("A&J", luxon.DateTime.utc(2023, 7, 7), "", "Give me your money!", "abc")
const nightMarket = new SampleMarket("Night Market", "abc", [Regions.AU, Regions.VN, Regions.US], luxon.DateTime.utc(2020, 12, 20))
const dayMarket = new MainMarket("Day Market", "xyz", [Regions.UK, Regions.JP, Regions.VN], luxon.DateTime.utc(2015, 7, 7))

const to = new User("TO12", "jamie", "", "password", Regions.US)
const bim = new User("BIM07", "bimimaru", "", "pass", Regions.UK)
const nu = new User("NU03", "numiao", "", "pass", Regions.VN)
const tam = new User("TAM21", "avery", "", "pass", Regions.VN)

const macbook = new Product("MAC01", "Macbook Air 2023", 10, 2000, "Electronic", "Apple", [])
const iphone = new Product("IP11", "Iphone 15 Pro", 15, 1500, "Electronic", "Apple", [])
const shirt = new Product("", "Orange T-shirt", 20, 60, "Clothes", "Zara", [])
const hat = new Product("", "Cap Hat", 30, 30, "Clothes", "LA", [])
const comChay = new Product("", "Com Chay Ngon", 100, 15, "Food", "Homebrand", [])

const tamComChay = new CartItem(comChay, 2, "")
const bimMacbook = new CartItem(macbook, 1, "")
const tamIphone = new CartItem(iphone, 3, "")

aj.addMarket(nightMarket)
aj.addMarket(dayMarket)

aj.joinWebsite(to)
aj.joinWebsite(bim)
aj.joinWebsite(nu)

aj.addProduct(macbook, aj.signInSession(to));
aj.addProduct(iphone, aj.signInSession(to))
aj.addProduct(comChay, aj.signInSession(bim))
aj.addProduct(shirt, aj.signInSession(nu))
aj.addProduct(hat, aj.signInSession(nu))

aj.addToCart(aj.signInSession(tam), tamComChay)
aj.addToCart(aj.signInSession(tam), tamIphone)
aj.addToCart(aj.signInSession(bim), bimMacbook)

console.log(nightMarket.getCartList())
console.log("====")
console.log(dayMarket.getCartList())

const tamCart = aj.getUserCart(tam)
aj.proceedPayment(tamCart)


console.log(aj.findHighestMarketRevenue())

//console.log(nightMarket.getProducts())

// aj.signOutSession(bim)

//aj.findProductByName(aj.signInSession(nu), "Cap Hat")
//console.log("====================")
//console.log(dayMarket.getProducts())

// console.log(aj.searchProducts(aj.signInSession(tam), nu))
// console.log("=======")
// console.log(aj.searchProducts(aj.signInSession(to), undefined, "Electronic"))
// console.log("=======")
// console.log(aj.searchProducts(aj.signInSession(to), undefined, undefined, { threshold1: 30, threshold2: 1600 }))

