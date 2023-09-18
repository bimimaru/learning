import { Market } from "./market";

export interface InterfaceMarket {
    transfer(): Market
    shutDown(): void
}