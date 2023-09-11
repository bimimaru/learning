// Website can have: name, launchedDate, version (string), slogan, headAddress, revenue
import * as luxon from "luxon"
import { User } from "./user"
import { Product } from "./product"
import { Session } from "./session"
import { Regions } from "./regions"

class Website {
    private name: string
    private launchedDate: luxon.DateTime
    private version: string
    private slogan: string
    private headAddress: string
    private revenue: number
    private users: User[]
    private regions: Regions[]
    private session: Session[]
    constructor(name: string, launchedDate: luxon.DateTime, version: string, slogan: string, headAddress: string) {
        this.name = name;
        this.launchedDate = launchedDate;
        this.version = version;
        this.slogan = slogan;
        this.headAddress = headAddress;
        this.revenue = 0;
        this.users = []
        this.regions = []
        this.session = []

    }
    getSession() {
        return this.session;
    }
    getRegions() {
        return this.regions;
    }
    getUsers() {
        return this.users;
    }
    getRevenue() {
        return this.revenue;
    }
    setRevenue(revenue: number) {
        this.revenue += revenue;
        return this.revenue;
    }

    findProductByName(session: Session, productName: string) { //11
        let region = session.getUser().getRegion();
    }

    signOutSession(user: User) {//10
        let sessionIndex = this.session.findIndex((element) => element.getUser() == user)
        this.session.splice(sessionIndex, 1)
    }
    signInSession(user: User) { //9
        let checkSession = this.session.find((element) => element.getUser() == user)
        if (checkSession == undefined) {
            let newSession = new Session(user)
            this.session.push(newSession)
        }
    }
    joinWebsite(member: User) {
        return this.users.push(member)
    }
}

export { Website }