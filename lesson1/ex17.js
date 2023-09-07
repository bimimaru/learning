// Write 2 classes: Tire & Car
// Tire should have properties: company, model, size
// Car should have properties:  model, color, tires (list of tires)
// Car can install 4 new tires
class Tire {
    constructor(company, model, size) {
        this.company = company;
        this.model = model;
        this.size = size;
    }
}
class Car {
    constructor(model, color, tires) {
        this.model = model;
        this.color = color;
        this.tires = tires;

    }
    install(tires) {
        this.tires = tires;
    }
}



const michelinTire = new Tire("Michinelin", "MI1", "L")
const michelinTires = [michelinTire, michelinTire, michelinTire, michelinTire]

const car = new Car("VF8", "red", michelinTires);
console.log(car)

const continentalTire = new Tire("Continental", "CON2", "L")
const continentalTires = [continentalTire, continentalTire, continentalTire, continentalTire]
car.install(continentalTires);
console.log(car)