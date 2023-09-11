// Describe a User in the system with properties: 
// id, username, phoneNumber, password, isEnabled, region (US,UK,VN,...)

import { Regions } from "./regions"

class User {
    private id: string
    private username: string
    private phoneNumber: string
    private password: string
    private isEnabled: boolean
    private region: Regions
    constructor(id: string, username: string, phoneNumber: string, password: string, region: Regions) {
        this.id = id;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.isEnabled = true;
        this.region = region;
    }
    getRegion() {
        return this.region;
    }
    setEnable(enable: boolean) {
        this.isEnabled = enable;
        return this.isEnabled;
    }
    getEnable() {
        return this.isEnabled;
    }
}

export { User }