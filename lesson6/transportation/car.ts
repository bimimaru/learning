import { Runnable } from "./run-interface";
import { Transportation } from "./transportation";

export class Car extends Transportation implements Runnable {
    constructor(model: string) {
        super(model)
    }
    run() {
        console.log(this.model + " is running.")
    }
}