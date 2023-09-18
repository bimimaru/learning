import { Sailable } from "./sail-interface";
import { Transportation } from "./transportation";

export class Ship extends Transportation implements Sailable {
    constructor(model: string) {
        super(model)
    }
    sail() {
        console.log(this.model + " is sailing")
    }
}