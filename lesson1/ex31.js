// Write 4 classes stands for Person, Car, House

/**
 * Person has properties (name,age,tel)
 * Car has properties (model,color,price)
 * House has properties (price,area,address)
 * 
 * A person can adopt children (>1)
 * A person can buy a house
 * A person can buy many cars (>1)
 * 
 * Write method to calculate total wealth of a person
 */

// const bim = new Person(...)
// bim.adopt([new Person(), new Person()])
// bim.buy([new Car(), new Car()])
// bim.buy(new House())
// bim.getWealth() // 200,000

class Person {
    constructor(name, age, tel) {
        this.name = name;
        this.age = age;
        this.tel = tel;
    }
    mapChildrenToName() {
        const childrenNames = [];

        for (let i = 0; i < this.children.length; i++) {
            childrenNames.push(this.children[i].name)
        }

        return childrenNames
    }
    adopt(children) {
        this.children = children;
        console.log(this.name + " adopted " + this.mapChildrenToName());
    }
    mapCarToName() {
        const carNames = [];
        for (let i = 0; i < this.cars.length; i++) {
            carNames.push(this.cars[i].model)
        }
        return carNames;
    }
    buyCar(cars) {
        this.cars = cars;
        console.log(this.name + " bought " + this.mapCarToName());

    }
    buyHouse() {
        this.house = house;
        console.log(this.name + " bought a " + house)
    }
    getTotalWealth() {
        let total = 0;
        for (let i = 0; i < this.mapCarToName().length; i++) {
            total += this.cars[i].price;
        }
        total += this.house.price;
        return total;
    }
    workingInOffice(office) {
        this.office = office;
        console.log(this.name + " works at " + office.name)
    }
}
class Car {
    constructor(model, color, price) {
        this.model = model;
        this.color = color;
        this.price = price;
    }

}
class House {
    constructor(price, area, address) {
        this.price = price;
        this.area = area;
        this.address = address;
    }

}

class Office {
    constructor(name, address) {
        this.name = name;
        this.address = address;
    }
}


const person = new Person("To", "0902514621")
person.adopt([new Person("A", "9"), new Person("B", 10, "090")])
const house = new House(200000, "200m^2", "1 HTK HCMC");
person.buyHouse(house)
const cars = [new Car("Toyota", "White", 60000), new Car("Honda", "Black", 70000)]
person.buyCar(cars)
console.log(person.getTotalWealth())
const office = new Office("McKenzie", "10 NDC HCMC")
console.log(person.workingInOffice())