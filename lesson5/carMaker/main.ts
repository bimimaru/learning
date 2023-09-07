// Write 2 classes: Tire & Car
// Tire should have properties: company, model, size
// Car should have properties:  model, color, tires (list of tires)
// Car can install 4 new tires
import { Car } from "./car";
import { Tire } from "./tire";
const michelinTire = new Tire("Michinelin", "MI1", "L")
const michelinTires = [michelinTire, michelinTire, michelinTire, michelinTire]

const car = new Car("VF8", "red", michelinTires);
console.log(car)

const continentalTire = new Tire("Continental", "CON2", "L")
const continentalTires = [continentalTire, continentalTire, continentalTire, continentalTire]
car.install(continentalTires);
console.log(car)

car.run(2000)