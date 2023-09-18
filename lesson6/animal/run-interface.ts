import { Speakable } from "./speak-interface";

export interface Runnable extends Speakable {
    run(): void
}