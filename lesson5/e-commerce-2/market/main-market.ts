import { Regions } from "../regions"
import { Market } from "./market"

export class MainMarket extends Market {
    constructor(name: string, address: string, regions: Regions[], launchedDate: luxon.DateTime) {
        super(name, address, regions, launchedDate)
    }
    override shutDown(): void {
        console.log("Unable to shut down!")
    }

    public override transfer(): Market {
        throw new Error("Main market can not be transfer");
    }
}