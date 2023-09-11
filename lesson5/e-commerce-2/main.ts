import { Market } from "./market";
import { Product } from "./product";
import { Regions } from "./regions";
import { User } from "./user";
import { Website } from "./website";
import * as luxon from "luxon"

const aj = new Website("A&J", luxon.DateTime.utc(2023, 7, 7), "", "Give me your money!", "abc")
const nightMarket = new Market("Night Market", "abc", [Regions.AU, Regions.VN, Regions.US])
const dayMarket = new Market("Day Market", "xyz", [Regions.UK, Regions.JP, Regions.VN])

const to = new User("TO12", "jamie", "", "password", Regions.US)
const bim = new User("BIM07", "bimimaru", "", "pass", Regions.UK)
const nu = new User("NU03", "numiao", "", "pass", Regions.VN)

const macbook = new Product("MAC01", "Macbook Air 2023", 10, 2000, "Electronic", "Apple", [])
const iphone = new Product("IP11", "Iphone 15 Pro", 15, 1500, "Electronic", "Apple", [])
const shirt = new Product("", "Orange T-shirt", 20, 60, "Clothes", "Zara", [])
const hat = new Product("", "Cap Hat", 30, 30, "Clothes", "LA", [])
const comChay = new Product("", "Com Chay Ngon", 100, 15, "Food", "Homebrand", [])

nightMarket.addSellProduct(macbook, to)
nightMarket.addSellProduct(iphone, to)
dayMarket.addSellProduct(shirt, nu)
dayMarket.addSellProduct(hat, nu)
dayMarket.addSellProduct(comChay, bim)

aj.joinWebsite(to)
aj.joinWebsite(bim)
aj.joinWebsite(nu)


aj.addProduct(macbook, aj.signInSession(to));

//aj.signInSession(nu)
// aj.signOutSession(bim)

nightMarket.findProductByName(nu, "Iphone 15 Pro")
//dayMarket.searchProducts(nu)