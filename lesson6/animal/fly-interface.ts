import { Speakable } from "./speak-interface";

export interface Flyable extends Speakable {
    fly(): void
}