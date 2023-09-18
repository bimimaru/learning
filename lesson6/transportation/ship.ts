import { Sail } from "./sail-interface";
import { Transportation } from "./transportation";

export class Ship extends Transportation implements Sail {
    constructor(model: string) {
        super(model)
    }
    sail() {
        console.log(this.model + " is sailing")
    }
}