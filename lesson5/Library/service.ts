// Library have many public services

// PrintingService: name, cost/use, isAvailable
// RentingHeadphoneService: name, cost/use, isAvailable
// CoSpaceService: name, cost/use, isAvailable
import { Guest, Member, PermanentMember } from "./member";

class Service {
    protected name: string
    protected costPerUse: number
    protected isAvalable: boolean
    private numberOfUsed: number
    constructor(name: string, costPerUse: number) {
        this.name = name;
        this.costPerUse = costPerUse;
        this.isAvalable = true;
        this.numberOfUsed = 0;
    }
    public getName() {
        return this.name;
    }
    public getNumberOfUsed() {
        return this.numberOfUsed;
    }
    public getCost() {
        return this.costPerUse;
    }
    public consume(member: Member): void {
        this.numberOfUsed++;
        console.log("Your service has been used.")
    }
}

class PrintingService extends Service {
    constructor(name: string, costPerUse: number) {
        super(name, costPerUse)
    }
    public override consume(member: Member): void {
        super.consume(member);
        console.log("Printing service is being used!")
    }
}

class RentingHeadphoneService extends Service {
    constructor(name: string, costPerUse: number) {
        super(name, costPerUse)
    }
    public override consume(member: Member): void {
        if (member instanceof Guest) {
            throw new Error('Member is not eligible for that service.')
        } else {
            super.consume(member);
            console.log("Renting headphone service is being used!")
        }
    }
}

class CoSpaceService extends Service {
    constructor(name: string, costPerUse: number) {
        super(name, costPerUse)
    }
    public override consume(member: Member): void {
        if (member instanceof PermanentMember && (member as PermanentMember).isVIP == true) {
            console.log("CoSpace service is being used!")
        } else {
            super.consume(member);
            throw new Error('Member is not eligible for that service.')
        }
    }
}

export { Service, CoSpaceService, RentingHeadphoneService, PrintingService }