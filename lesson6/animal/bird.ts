import { Animal } from "./animal";
import { Flyable } from "./fly-interface";

export class Bird extends Animal implements Flyable {
    constructor(name: string, color: string) {
        super(name, color);
    }
    override speak() {
        console.log("chip chip")
    }
    fly() {
        console.log(super.getName() + " can fly.")
    }
}