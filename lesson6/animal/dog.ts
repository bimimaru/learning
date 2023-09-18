import { Animal } from "./animal";
import { Runnable } from "./run-interface";

export class Dog extends Animal implements Runnable {
    constructor(name: string, color: string) {
        super(name, color);
    }
    override speak() {
        console.log("gau gau");
    }
    run() {
        console.log(super.getName() + " can run.")
    }
}