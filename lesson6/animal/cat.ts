import { Animal } from "./animal";
import { Run } from "./run-interface";

export class Cat extends Animal implements Run {
    constructor(name: string, color: string) {
        super(name, color)
    }
    override speak() {
        console.log("miao miao")
    }
    run() {
        console.log(super.getName() + " can run.")
    }
}