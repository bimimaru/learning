import { Run } from "./run-interface";
import { Transportation } from "./transportation";

export class Train extends Transportation implements Run {
    constructor(model: string) {
        super(model)
    }
    run() {
        console.log(this.model + " is running.")
    }
}