// Market will have properties: name, address, revenue, regions (list of string) => (ex: [US,UK,VN]), isEnabled

import { Product } from "./product"
import { Regions } from "./regions"
import { Session } from "./session"
import { User } from "./user"

class Market {
    private name: string
    private address: string
    private revenue: number
    private regions: Regions[]
    private isEnabled: boolean
    protected sellProducts: Product[]
    constructor(name: string, address: string, regions: Regions[]) {
        this.name = name;
        this.address = address;
        this.revenue = 0;
        this.regions = regions;
        this.isEnabled = true;
        this.sellProducts = []
    }
    setEnable(enable: boolean) {
        this.isEnabled = enable;
        return this.isEnabled;
    }
    getEnable() {
        return this.isEnabled;
    }
    getRegion() {
        return this.regions;
    }

    findUserInMarket(region: Regions): User[] { //13
        let result: User[] = []
        for (let i = 0; i < this.sellProducts.length; i++) {
            if (this.sellProducts[i].getUser().getRegion() == region) {
                result.push(this.sellProducts[i].getUser())
            }
        }
        return result;
    }

    searchProducts(owner: User | undefined, category: string | undefined, threshold1: number | undefined, threshold2: number | undefined): Product[] {//12
        let result: Product[] = []
        if (owner != undefined && category == undefined && threshold1 == undefined && threshold2 == undefined) {
            this.findProductsByOwner(owner);
        } else if (owner == undefined && category != undefined && threshold1 == undefined && threshold2 == undefined) {
            this.findProductsByCategory(category);
        } else if (owner == undefined && category == undefined && threshold1 != undefined && threshold2 != undefined) {
            this.findProductsByThresholds(threshold1, threshold2)
        } else if (owner == undefined && category != undefined && threshold1 != undefined && threshold2 != undefined) {
            this.findProductsByThresholdsAndCategory(category, threshold1, threshold2)
        } else if (owner != undefined && category == undefined && threshold1 != undefined && threshold2 != undefined) {
            this.findProductsByThresholdsAndOwner(owner, threshold1, threshold2)
        } else {
            console.log("There is no product suited your search.")
        }
        return result;
    }
    findProductsByThresholdsAndOwner(owner: User, threshold1: number, threshold2: number) {
        let result: Product[] = []
        for (let i = 0; i < this.sellProducts.length; i++) {
            if (this.sellProducts[i].getUser() == owner &&
                this.sellProducts[i].getPrice() >= threshold1 && this.sellProducts[i].getPrice() <= threshold2) {
                result.push(this.sellProducts[i])
            }
        }
        return result;
    }
    findProductsByThresholdsAndCategory(category: string, threshold1: number, threshold2: number) {
        let result: Product[] = []
        for (let i = 0; i < this.sellProducts.length; i++) {
            if (this.sellProducts[i].getCategory() == category &&
                this.sellProducts[i].getPrice() >= threshold1 && this.sellProducts[i].getPrice() <= threshold2) {
                result.push(this.sellProducts[i])
            }
        }
        return result;
    }
    findProductsByThresholds(threshold1: number, threshold2: number) {
        let result: Product[] = []
        for (let i = 0; i < this.sellProducts.length; i++) {
            if (this.sellProducts[i].getPrice() >= threshold1 && this.sellProducts[i].getPrice() <= threshold2) {
                result.push(this.sellProducts[i])
            }
        }
        return result;
    }
    findProductsByCategory(category: string) {
        let result: Product[] = []
        for (let i = 0; i < this.sellProducts.length; i++) {
            if (this.sellProducts[i].getCategory() == category) {
                result.push(this.sellProducts[i])
            }
        }
        return result;
    }
    findProductsByOwner(owner: User) {
        let result: Product[] = []
        for (let i = 0; i < this.sellProducts.length; i++) {
            if (this.sellProducts[i].getUser() == owner) {
                result.push(this.sellProducts[i])
            }
        }
        return result;
    }

    findProductByName(user: User, productName: string) { //11
        let userRegion = user.getRegion();
        let result: Product[] = []
        for (let i = 0; i < this.regions.length; i++) {
            if (this.regions[i] == userRegion) {
                for (let j = 0; j < this.sellProducts.length; j++) {
                    if (this.sellProducts[j].getName() == productName) {
                        result.push(this.sellProducts[j])
                    }
                }
            }
        }
        console.log(result)
        return result;
    }
    disableProduct(product: Product) { //8
        let foundProduct = this.sellProducts.find((element) => element == product)
        foundProduct!.setEnable(false)
    }
    addSellProduct(product: Product, user: User) { //6
        product.setUser(user)
        this.sellProducts.push(product)
    }
    updateSellProduct(product: Product, user: User, quantity: number) { //7
        let foundProduct = this.sellProducts.find((element) => element == product)
        let foundUser = this.sellProducts.find((element) => element.getUser() == user)
        if (foundProduct != undefined && foundUser != undefined) {
            foundProduct.setQuantity(quantity)
        }
    }
}

export { Market }