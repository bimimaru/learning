import { Animal } from "./animal";
import { Runnable } from "./run-interface";

export class Lion extends Animal implements Runnable {
    constructor(name: string, color: string) {
        super(name, color);
    }
    override speak() {
        console.log("roar roar")
    }
    run() {
        console.log(super.getName() + " can run.")
    }
}