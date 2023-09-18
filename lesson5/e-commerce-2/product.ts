// Describe a Product in the system with properties:
// id, name, quantity, price, category, brand, images (list of string), isEnabled

import { UserInfo } from "os"
import { User } from "./user"

class Product {
    private id: string
    private name: string
    protected quantity: number
    protected price: number
    protected category: string
    protected brand: string
    private images: string[]
    private isEnabled: boolean
    private owner: User
    constructor(id: string, name: string, quantity: number, price: number, category: string, brand: string, images: string[], owner: User) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.price = price;
        this.category = category;
        this.brand = brand;
        this.isEnabled = true;
        this.images = images;
        this.owner = owner;
    }
    
    getOwner() {
        return this.owner;
    }
    getCategory() {
        return this.category;
    }
    setEnable(enable: boolean) {
        this.isEnabled = enable;
        return this.isEnabled;
    }
    getEnable() {
        return this.isEnabled;
    }
    getPrice() {
        return this.price;
    }
    setQuantity(quantity: number) {
        this.quantity = quantity;
        return this.quantity;
    }
    getQuantity() {
        return this.quantity;
    }
    getName() {
        return this.name;
    }
}

export { Product }