import { Flyable } from "./fly-interface";
import { Transportation } from "./transportation";

export class Plane extends Transportation implements Flyable {
    constructor(model: string) {
        super(model)
    }
    fly() {
        console.log(this.model + " is flying.")
    }
}