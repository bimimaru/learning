// Write a class named Animal. Animal can have name, color. 
// Dog, Cat, Bird are also animals.
// Animal can speak. But it will behave differently depends on each type.

import { Speak } from "./speak-interface";

// Dog & Cat can run
// Bird can only fly

export class Animal implements Speak {
    private name: string
    private color: string
    constructor(name: string, color: string) {
        this.name = name;
        this.color = color;
    }
    getName() {
        return this.name;
    }
    speak() {
        console.log("Animal can talk.")
    }
}