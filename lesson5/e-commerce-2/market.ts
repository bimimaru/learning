// Market will have properties: name, address, revenue, regions (list of string) => (ex: [US,UK,VN]), isEnabled
import * as luxon from "luxon"
import { Product } from "./product"
import { Regions } from "./regions"
import { Session } from "./session"
import { User } from "./user"
import { Employee } from "./employee"
import { Cart } from "./cart"

export class Market {
    private name: string
    private address: string
    protected revenue: number
    protected regions: Regions[]
    protected isEnabled: boolean
    protected sellProducts: Product[]
    protected transaction: Cart[]
    private manager: Employee | undefined
    private cartList: Cart[]
    constructor(name: string, address: string, regions: Regions[]) {
        this.name = name;
        this.address = address;
        this.revenue = 0;
        this.regions = regions;
        this.isEnabled = true;
        this.sellProducts = []
        this.transaction = []
        this.manager = undefined
        this.cartList = []
    }
    getAddress() {
        return this.address;
    }
    getName() {
        return this.name;
    }
    setRevenue(revenue: number) {
        this.revenue = revenue;
        return this.revenue;
    }
    getRevenue() {
        return this.revenue;
    }
    getTransaction() {
        return this.transaction;
    }
    getProducts() {
        return this.sellProducts;
    }
    public setEnable(enable: boolean) {
        this.isEnabled = enable;
        return this.isEnabled;
    }
    public getEnable() {
        return this.isEnabled;
    }
    public getRegion() {
        return this.regions;
    }
    public getCartList() {
        return this.cartList;
    }

    getMarketReport() { //23
        // {
        //     launchedDate,
        //     dateExported,
        //     totalUsers,
        //     revenue,
        //     numberOfTransaction,
        //     marketQuality (revenue/numberOfUser)	
        // }

    }

    // addToCarts(cart: Cart) {
    //     this.cartList.push(cart)
    // }
    public shutDown() {
        this.isEnabled = false;
        this.transaction = [];
    }
    public addSellProduct(product: Product, session: Session) { //6
        product.setOwner(session.getUser())
        this.sellProducts.push(product)
    }

    public assignManager(manager: Employee) { //18
        this.manager = manager;
    }

    public findUserInMarket(region: Regions): User[] { //13
        let result: User[] = []
        for (let i = 0; i < this.sellProducts.length; i++) {
            if (this.sellProducts[i].getOwner()?.getRegion() == region && !result.includes(this.sellProducts[i].getOwner()!)) {
                result.push(this.sellProducts[i].getOwner()!)
            }
        }
        return result;
    }

    public disableProduct(product: Product) { //8
        let foundProduct = this.sellProducts.find((element) => element == product)

        if (foundProduct != undefined) {
            foundProduct.setEnable(false)
        }
    }

}

export class SampleMarket extends Market {
    private lauchedDate: luxon.DateTime
    private shutDownDate: luxon.DateTime | undefined = undefined
    constructor(name: string, address: string, regions: Regions[], launchedDate: luxon.DateTime) {
        super(name, address, regions)
        this.lauchedDate = launchedDate;
    }
    getLaunchedDate() {
        return this.lauchedDate;
    }
    override shutDown(): void {
        super.shutDown()
        this.shutDownDate = luxon.DateTime.now()
    }
}
export class MainMarket extends Market {
    private lauchedDate: luxon.DateTime
    constructor(name: string, address: string, regions: Regions[], launchedDate: luxon.DateTime) {
        super(name, address, regions)
        this.lauchedDate = launchedDate;
    }
    getLaunchedDate() {
        return this.lauchedDate;
    }
    override shutDown(): void {
        console.log("Unable to shut down!")
    }
}