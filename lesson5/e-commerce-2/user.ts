// Describe a User in the system with properties: 
// id, username, phoneNumber, password, isEnabled, region (US,UK,VN,...)

import { Membership } from "./membership"
import { Regions } from "./regions"

class User {
    private id: string
    private username: string
    private phoneNumber: string
    private password: string
    private isEnabled: boolean
    private region: Regions
    private point: number
    private membership: Membership
    constructor(id: string, username: string, phoneNumber: string, password: string, region: Regions) {
        this.id = id;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.isEnabled = true;
        this.region = region;
        this.point = 0;
        this.membership = Membership.Bronze;
    }
    getUsername() {
        return this.username;
    }
    setMembership(membership: Membership) {
        this.membership = membership;
        return this.membership
    }
    getMembership() {
        return this.membership;
    }
    setPoint(point: number) {
        this.point = point;
        return this.point;
    }
    getPoint() {
        return this.point;
    }
    getID() {
        return this.id;
    }
    public getRegion() {
        return this.region;
    }
    public setEnable(enable: boolean) {
        this.isEnabled = enable;
        return this.isEnabled;
    }
    public getEnable() {
        return this.isEnabled;
    }
}

export { User }