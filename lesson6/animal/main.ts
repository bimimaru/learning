import { Bird } from "./bird";
import { Cat } from "./cat";
import { Dog } from "./dog";
import { Lion } from "./lion";
import { Run } from "./run-interface";


const dog = new Dog("Cho", "black")
const cat = new Cat("Meo", "white")
const bird = new Bird("Chim", "Grey")
const lion = new Lion("Su Tu", "yellow")

// dog.speak()
// cat.run()
// bird.fly()
// lion.speak()

const animals = [dog, cat, lion]

function run(animals: Run[]) {
    for (let i = 0; i < animals.length; i++) {
        animals[i].run();
    }
}