import { Regions } from "../regions"
import { Market } from "./market"

export class MainMarket extends Market {
    constructor(name: string, address: string, regions: Regions[], launchedDate: luxon.DateTime) {
        super(name, address, regions, launchedDate)
    }
}