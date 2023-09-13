// Website can have: name, launchedDate, version (string), slogan, headAddress, revenue
import * as luxon from "luxon"
import { User } from "./user"
import { Product } from "./product"
import { Session } from "./session"
import { Regions } from "./regions"
import { MainMarket, Market, SampleMarket } from "./market"
import { CartItem } from "./cartItem"
import { Cart } from "./cart"

class Website {
    private name: string
    private launchedDate: luxon.DateTime
    private version: string
    private slogan: string
    private headAddress: string
    private revenue: number
    private users: User[]
    private markets: Market[]
    private session: Session[]
    constructor(name: string, launchedDate: luxon.DateTime, version: string, slogan: string, headAddress: string) {
        this.name = name;
        this.launchedDate = launchedDate;
        this.version = version;
        this.slogan = slogan;
        this.headAddress = headAddress;
        this.revenue = 0;
        this.users = []
        this.markets = []
        this.session = []

    }
    public getSession() {
        return this.session;
    }
    public getRegions() {
        return this.markets;
    }
    public getUsers() {
        return this.users;
    }
    public getRevenue() {
        return this.revenue;
    }
    public setRevenue(revenue: number) {
        this.revenue += revenue;
        return this.revenue;
    }

    findHighestMarketRevenue(): Market { //22
        let result: Market | undefined = undefined
        let maxRevenueIndex = 0
        for (let i = 0; i < this.markets.length; i++) {
            if (this.markets[i].getRevenue() > this.markets[maxRevenueIndex].getRevenue()) {
                maxRevenueIndex = i
            }
        }
        result = this.markets[maxRevenueIndex]
        return result;
    }

    public proceedPayment(cart: Cart) { //21
        for (let i = 0; i < this.markets.length; i++) {
            let foundMarket = this.markets[i].getRegion().includes(cart.getUser().getRegion())
            if (foundMarket) {
                this.markets[i].setRevenue(cart.getTotal())
                this.markets[i].getTransaction().push(cart)
            }
        }
    }

    public addToCart(session: Session, cartItem: CartItem) { // 20
        let cart = this.getUserCart(session.getUser())
        if (cart) {
            cart.addCartItem(cartItem)
        }
    }

    public getUserCart(user: User): Cart {
        let cart: Cart | undefined = undefined
        for (let i = 0; i < this.markets.length; i++) {
            let foundMarket = this.markets[i].getRegion().includes(user.getRegion())
            if (foundMarket) {
                let cartList = this.markets[i].getCartList()
                let foundCartIndex = cartList.findIndex((element) => element.getUser() == user)
                if (foundCartIndex >= 0) {
                    cart = cartList[foundCartIndex];
                } else {
                    cart = new Cart(user)
                    cartList.push(cart)
                }
            }
        }
        if (cart) {
            return cart;
        } else {
            throw new Error("Cart not found for this user!")
        }
    }

    public transferMarket(market: SampleMarket) { //17
        let transferredMarket = new MainMarket(market.getName(), market.getAddress(), market.getRegion(), market.getLaunchedDate())
        transferredMarket.setRevenue(market.getRevenue())

        for (let i = 0; i < market.getProducts().length; i++) {
            transferredMarket.getProducts().push(market.getProducts()[i])
        }

        market.shutDown()
    }
    public shutDown(market: Market) { //16
        this.revenue += market.getRevenue();
        market.shutDown()
    }

    public searchProducts(//12
        session: Session,
        owner: User | undefined = undefined,
        category: string | undefined = undefined,
        thresholds: {
            threshold1: number,
            threshold2: number
        } | undefined = undefined
    ) {
        let result: Product[] = []
        for (let i = 0; i < this.markets.length; i++) {
            if (this.markets[i].getRegion().includes(session.getUser().getRegion())) {
                let products = this.markets[i].getProducts()
                for (let j = 0; j < products.length; j++) {
                    if (owner != undefined && category == undefined && thresholds == undefined) {
                        if (products[j].getOwner() == owner && products[j].getEnable() && !result.includes(products[j])) {
                            result.push(products[j])
                        }

                    } else if (owner == undefined && category != undefined && thresholds == undefined) {
                        if (products[j].getCategory() == category && products[j].getEnable() && !result.includes(products[j])) {
                            result.push(products[j])
                        }

                    } else if (owner == undefined && category == undefined && thresholds != undefined) {
                        if (products[j].getPrice() >= thresholds.threshold1 && products[j].getPrice() <= thresholds.threshold2
                            && products[j].getEnable() && !result.includes(products[j])) {
                            result.push(products[j])
                        }

                    } else if (owner == undefined && category != undefined && thresholds != undefined) {
                        if (products[j].getCategory() == category && products[j].getEnable() &&
                            products[j].getPrice() >= thresholds.threshold1 && products[j].getPrice() <= thresholds.threshold2
                            && !result.includes(products[j])) {
                            result.push(products[j])
                        }

                    } else if (owner != undefined && category == undefined && thresholds != undefined) {
                        if (products[j].getOwner() == owner && products[j].getEnable() &&
                            products[j].getPrice() >= thresholds.threshold1 && products[j].getPrice() <= thresholds.threshold2
                            && !result.includes(products[j])) {
                            result.push(products[j])
                        }

                    } else {
                        console.log("There is no product suited your search.")
                    }
                }
            }
        }
        return result;
    }
    // private findProductsByThresholdsAndOwner(session: Session, owner: User, threshold1: number, threshold2: number) {
    //     let result: Product[] = []
    //     for (let i = 0; i < this.markets.length; i++) {
    //         if (this.markets[i].getRegion().includes(session.getUser().getRegion())) {

    //             let products = this.markets[i].getProducts()
    //             for (let j = 0; j < products.length; j++) {
    //                 if (products[j].getOwner() == owner && products[j].getEnable() &&
    //                     products[j].getPrice() >= threshold1 && products[j].getPrice() <= threshold2
    //                     && !result.includes(products[j])) {
    //                     result.push(products[j])
    //                 }
    //             }
    //         }
    //     }
    //     return result;
    // }
    // private findProductsByThresholdsAndCategory(session: Session, category: string, threshold1: number, threshold2: number) {
    //     let result: Product[] = []
    //     for (let i = 0; i < this.markets.length; i++) {
    //         if (this.markets[i].getRegion().includes(session.getUser().getRegion())) {

    //             let products = this.markets[i].getProducts()
    //             for (let j = 0; j < products.length; j++) {
    //                 if (products[j].getCategory() == category && products[j].getEnable() &&
    //                     products[j].getPrice() >= threshold1 && products[j].getPrice() <= threshold2
    //                     && !result.includes(products[j])) {
    //                     result.push(products[j])
    //                 }
    //             }
    //         }
    //     }
    //     return result;
    // }
    // private findProductsByThresholds(session: Session, threshold1: number, threshold2: number) {
    //     let result: Product[] = []
    //     for (let i = 0; i < this.markets.length; i++) {
    //         if (this.markets[i].getRegion().includes(session.getUser().getRegion())) {

    //             let products = this.markets[i].getProducts()
    //             for (let j = 0; j < products.length; j++) {
    //                 if (products[j].getPrice() >= threshold1 && products[j].getPrice() <= threshold2
    //                     && products[j].getEnable() && !result.includes(products[j])) {
    //                     result.push(products[j])
    //                 }
    //             }
    //         }
    //     }
    //     return result;
    // }
    // private findProductsByCategory(session: Session, category: string) {
    //     let result: Product[] = []
    //     for (let i = 0; i < this.markets.length; i++) {
    //         if (this.markets[i].getRegion().includes(session.getUser().getRegion())) {

    //             let products = this.markets[i].getProducts()
    //             for (let j = 0; j < products.length; j++) {
    //                 if (products[j].getCategory() == category && products[j].getEnable() && !result.includes(products[j])) {
    //                     result.push(products[j])
    //                 }
    //             }
    //         }
    //     }
    //     return result;
    // }

    // private findProductsByOwner(session: Session, owner: User) {
    //     let result: Product[] = []
    //     if (session.getUser().getRegion() == owner.getRegion()) {
    //         for (let i = 0; i < this.markets.length; i++) {
    //             if (this.markets[i].getRegion().includes(owner.getRegion())) {
    //                 let products = this.markets[i].getProducts();
    //                 for (let j = 0; j < products.length; j++) {
    //                     if (products[j].getOwner() == owner && products[j].getEnable() && !result.includes(products[j])) {
    //                         result.push(products[j])
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     return result;
    // }

    public updateSellProduct(product: Product, session: Session, quantity: number) { //7
        let foundMarket = this.markets.find((market) => market.getRegion().includes(session.getUser().getRegion()))
        let foundProduct = foundMarket?.getProducts().find((element) => element == product)
        let foundUser = foundMarket?.getProducts().find((element) => element.getOwner() == session.getUser())

        if (foundProduct != undefined && foundUser != undefined) {
            foundProduct.setQuantity(quantity)
        }
    }

    public findProductByName(session: Session, productName: string) { //11
        let userRegion = session.getUser().getRegion();
        let result: Product[] = []
        for (let i = 0; i < this.markets.length; i++) {
            if (this.markets[i].getRegion().includes(userRegion)) {
                let product = this.markets[i].getProducts()
                for (let j = 0; j < product.length; j++) {
                    if (product[j].getName() == productName) {
                        result.push(product[j])
                    }
                }
            }
        }
        console.log(result)
        return result;
    }

    public signOutSession(user: User) {//10
        let sessionIndex = this.session.findIndex((element) => element.getUser() == user)
        this.session.splice(sessionIndex, 1)
    }
    public signInSession(user: User) { //9
        let checkSession = this.session.find((element) => element.getUser() == user)
        if (checkSession == undefined) {
            let newSession = new Session(user)
            this.session.push(newSession)
            return newSession
        } else {
            return checkSession;
        }
    }
    public joinWebsite(member: User) {
        return this.users.push(member)
    }

    public addMarket(market: Market) { //15
        this.markets.push(market)
        return this.markets;
    }

    public addProduct(product: Product, session: Session) { // 5 +6
        for (let i = 0; i < this.markets.length; i++) {
            let regions = this.markets[i].getRegion()
            for (let j = 0; j < regions.length; j++) {
                if (session.getUser().getRegion() == regions[j]) {
                    this.markets[i].addSellProduct(product, session)
                }
            }
            // const market = this.markets.find((market) => market.getRegion().includes(session.getUser().getRegion()));
            // if (market) {
            //     market.addSellProduct(product, session);
            // } else {
            //     throw new Error('Our market has not been deployed yet!');
            // }
        }
        //throw new Error('Our market has not been deployed yet!');
    }
}

export { Website }