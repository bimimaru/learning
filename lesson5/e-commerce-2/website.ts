// Website can have: name, launchedDate, version (string), slogan, headAddress, revenue
import * as luxon from "luxon"
import { User } from "./user"
import { Product } from "./product"
import { Session } from "./session"
import { Regions } from "./regions"
import { MainMarket, Market, SampleMarket } from "./market"
import { CartItem } from "./cartItem"
import { Cart } from "./cart"
import { Membership } from "./membership"

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
        setInterval((): void => {//28
            this.checkActivity()
        }, 10000);
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

    getMarketReport(market: Market): object { //23
        let numberOfUser: number = 0;
        if (this.markets.includes(market)) {
            let marketUsers: User[] = []
            for (let i = 0; i < this.users.length; i++) {
                if (market.getRegion().includes(this.users[i].getRegion())) {
                    marketUsers.push(this.users[i]);
                }
            }
            numberOfUser = marketUsers.length;
        }

        let report: object = {
            launchedDate: market.getLaunchedDate().toUTC(),
            dateExported: luxon.DateTime.now().toUTC(),
            totalUsers: numberOfUser,
            revenue: market.getRevenue(),
            numberOfTransaction: market.getTransaction().length,
            marketQuality: (market.getRevenue() / numberOfUser)
        }
        return report;
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

    checkActivity() { //28
        for (let i = 0; i < this.markets.length; i++) {
            for (let j = 0; j < this.markets[i].getTransaction().length; j++) {
                let transaction = this.markets[i].getTransaction()[j]
                if (transaction.getTransactionDate() != undefined) {
                    let diff = luxon.Interval.fromDateTimes(transaction.getTransactionDate()!, luxon.DateTime.now())
                    let diffYear = diff.length("years")
                    if (diffYear > 1) {
                        let point = transaction.getUser().getPoint()
                        transaction.getUser().setPoint(point - (point * 0.3))
                        this.checkPromoteUser(transaction.getUser())
                    }
                }
            }
        }

    }

    public proceedPayment(cart: Cart) { //21
        for (let i = 0; i < this.markets.length; i++) {
            let foundMarket = this.markets[i].getRegion().includes(cart.getUser().getRegion())
            if (foundMarket) {
                let userMembership = cart.getUser().getMembership()
                //27
                if (userMembership == "Silver") {
                    cart.setTotal(cart.getTotal() - (cart.getTotal() * 0.02))
                } else if (userMembership == "Gold") {
                    cart.setTotal(cart.getTotal() - (cart.getTotal() * 0.05))
                } else if (userMembership == "Diamond") {
                    cart.setTotal(cart.getTotal() - (cart.getTotal() * 0.1))
                }
                //console.log("====", cart.getTotal())
                this.markets[i].setRevenue(cart.getTotal())
                //console.log(this.markets[i].getRevenue())
                cart.setTransactionDate(luxon.DateTime.now())
                this.markets[i].getTransaction().push(cart)
                this.generateUserPoint(cart)
                this.checkPromoteUser(cart.getUser())
            }
            break;
        }
    }
    private checkPromoteUser(user: User) { // 26
        //console.log(user)
        if (user.getPoint() > 1000) {
            user.setMembership(Membership.Diamond)
        } else if (user.getPoint() > 500) {
            user.setMembership(Membership.Gold)
        } else if (user.getPoint() > 100) {
            user.setMembership(Membership.Silver)
        }
        //console.log(user.getMembership())
        return user.getMembership();
    }
    private generateUserPoint(cart: Cart) {
        let buyer = cart.getUser()
        buyer.setPoint(buyer.getPoint() + (cart.getTotal() * 0.1))
        //console.log(buyer, "=========")
        //console.log(cart.getCartItem())
        for (let i = 0; i < cart.getCartItem().length; i++) {
            let seller = cart.getCartItem()[i].getProduct().getOwner()
            seller.setPoint(seller.getPoint() + (cart.getTotal() * 0.05))
            //console.log(seller, i)
        }
        //console.log(buyer)
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
            } else {
                throw new Error(user.getUsername() + " cannot add this item to his market.")
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

    public findTop3Seller() { // 24
        let foundAllSeller: { [keys: string]: number } = {}
        for (let i = 0; i < this.markets.length; i++) {
            let transaction = this.markets[i].getTransaction()
            for (let j = 0; j < transaction.length; j++) {
                let cartItem = transaction[j].getCartItem()
                for (let k = 0; k < cartItem.length; k++) {
                    let memberID = cartItem[k].getProduct().getOwner()?.getID()
                    let total = transaction[j].getTotal()
                    if (memberID != undefined) {
                        if (foundAllSeller[memberID]) {
                            foundAllSeller[memberID] += total;
                        } else {
                            foundAllSeller[memberID] = total;
                        }
                    }
                }
            }
        }

        let result: { [keys: string]: number } = {}
        for (let i = 0; i < 3; i++) {
            let keyResult = Object.keys(foundAllSeller)
            let maxTotalIndex = 0
            for (let j = 0; j < keyResult.length; j++) {
                if (foundAllSeller[keyResult[j]] > foundAllSeller[keyResult[maxTotalIndex]]) {
                    maxTotalIndex = j
                }
            }
            result[keyResult[maxTotalIndex]] = foundAllSeller[keyResult[maxTotalIndex]]
            delete foundAllSeller[keyResult[maxTotalIndex]]
        }
        console.log(result)
        return result;
    }

    public updateSellProduct(product: Product, session: Session, quantity: number) { //7
        if (session.getUser() == product.getOwner()) {
            let foundMarket = this.markets.find((market) => market.getRegion().includes(session.getUser().getRegion()))
            let foundProduct = foundMarket?.getProducts().find((element) => element == product)
            let foundUser = foundMarket?.getProducts().find((element) => element.getOwner() == session.getUser())

            if (foundProduct != undefined && foundUser != undefined) {
                foundProduct.setQuantity(quantity)
            }
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
        if (this.users.includes(user)) {
            let checkSession = this.session.find((element) => element.getUser() == user)
            if (checkSession == undefined) {
                let newSession = new Session(user)
                this.session.push(newSession)
                return newSession;
            } else {
                return checkSession;
            }
        } else {
            throw new Error("User has not joined the website yet!")
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
        if (session.getUser() == product.getOwner()) {
            for (let i = 0; i < this.markets.length; i++) {
                let regions = this.markets[i].getRegion()
                for (let j = 0; j < regions.length; j++) {
                    if (session.getUser().getRegion() == regions[j]) {
                        this.markets[i].addSellProduct(product)
                    }
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