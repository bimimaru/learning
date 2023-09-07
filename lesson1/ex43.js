const person = {
    name: "Bim",
    age: 32,
    getJob() {
        console.log(this.name + " go get a job.")
    }
}
person.getJob()

class House {
    constructor(address, ownerName, color, price, area, accessories) {
        this.address = address;
        this.ownerName = ownerName;
        this.color = color;
        this.price = price;
        this.area = area;
        this.accessories = accessories;
    }
    getAddress() {
        return this.address;
    }
    getOwnerName() {
        return this.ownerName;
    }
    getColor() {
        return this.color;
    }
    getPrice() {
        return this.price;
    }
    getArea() {
        return this.area;
    }
    getAccessories() {
        return this.accessories;
    }
}

const myHouse = new House("103 HTK", "Mr.Lang", "white", 400000, 100, "air con, furnitures, etc.")
console.log(myHouse.getPrice())
myHouse.getArea()
myHouse.getAccessories()
myHouse.getAddress()
myHouse.getOwnerName()
myHouse.getColor()