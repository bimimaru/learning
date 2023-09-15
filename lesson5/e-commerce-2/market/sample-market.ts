import luxon from "luxon"
import { Regions } from "../regions"
import { Market } from "./market"
import { MainMarket } from "./main-market";

export class SampleMarket extends Market {
    private shutDownDate: luxon.DateTime | undefined = undefined
    constructor(name: string, address: string, regions: Regions[], launchedDate: luxon.DateTime) {
        super(name, address, regions, launchedDate)
    }
    override shutDown(): void {
        super.shutDown()
        this.shutDownDate = luxon.DateTime.now()
    }

    public override transfer(): Market {
        const newMarket = new MainMarket(super.name, super.address, super.regions, luxon.DateTime.now());
        newMarket.setRevenue(super.revenue);

        for (let i = 0; i < super.sellProducts.length; i++) {
            newMarket.addSellProduct(this.sellProducts[i]);
        }
        return newMarket;
    }
}