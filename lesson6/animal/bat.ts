import { Animal } from "./animal";
import { Flyable } from "./fly-interface";

export class Bat extends Animal implements Flyable {
    constructor(name: string, color: string) {
        super(name, color);
    }
    override speak() {
        console.log("I'm BATMAN!")
    }
    fly(): void {
        console.log(this.name + " is flying.")
    }
}