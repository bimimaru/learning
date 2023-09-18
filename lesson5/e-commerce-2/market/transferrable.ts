import { Market } from "./market";

export interface Transferrable {
    transfer(): Market
    shutDown(): void
}