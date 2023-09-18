import { Animal } from "./animal";
import { Run } from "./run-interface";

export class Lion extends Animal implements Run {
    constructor(name: string, color: string) {
        super(name, color)
    }
    override speak() {
        console.log("roar roar")
    }
    run() {
        console.log(super.getName() + " can run.")
    }
}