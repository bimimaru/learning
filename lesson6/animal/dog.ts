import { Animal } from "./animal";
import { Run } from "./run-interface";

export class Dog extends Animal implements Run {
    constructor(name: string, color: string) {
        super(name, color)
    }
    override speak() {
        console.log("gau gau");
    }
    run() {
        console.log(super.getName() + " can run.")
    }
}