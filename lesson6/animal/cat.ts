import { Animal } from "./animal";
import { Runnable } from "./run-interface";

export class Cat extends Animal implements Runnable {
    constructor(name: string, color: string) {
        super(name, color);
    }
    override speak() {
        console.log("miao miao")
    }
    run() {
        console.log(super.getName() + " can run.")
    }
}