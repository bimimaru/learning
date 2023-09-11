import { User } from "./user";
import * as luxon from "luxon"

class Session {
    protected user: User
    private signedInAt: luxon.DateTime
    constructor(user: User) {
        this.user = user;
        this.signedInAt = luxon.DateTime.now()
    }
    getUser() {
        return this.user;
    }
}
export { Session }