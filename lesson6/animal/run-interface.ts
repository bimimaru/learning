import { Speak } from "./speak-interface";

export interface Run extends Speak {
    run(): void
}