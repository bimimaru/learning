import { Bat } from "./bat";
import { Bird } from "./bird";
import { Cat } from "./cat";
import { Dog } from "./dog";
import { Lion } from "./lion";
import { Runnable } from "./run-interface";


const dog = new Dog("Cho", "black")
const cat = new Cat("Meo", "white")
const bird = new Bird("Chim", "Grey")
const lion = new Lion("Su Tu", "yellow")
const bat = new Bat("Batman", "black")
// dog.speak()
// cat.run()
// bird.fly()
// lion.speak()

const animals = [dog, cat, lion]

function run(animals: Runnable[]) {
    for (let i = 0; i < animals.length; i++) {
        animals[i].run();
    }
}

run(animals)
bat.speak()