//Guest: id, name, createdAt, expiredAt, isEnabled, deposite, paid
// PermanentMember:id, name, createdAt, isEnabled, isVIP, deposite, paid
import * as luxon from "luxon";

class Member {
    private RENEWAL_COST = 10;
    private id: string
    protected name: string
    protected createAt: luxon.DateTime
    protected expiredAt: luxon.DateTime
    protected isEnabled: boolean
    protected deposit: number
    protected paid: number = 0;
    constructor(id: string, name: string, deposit: number, paid: number) {
        this.deposit = deposit;

        this.balance(paid);
        this.id = id;
        this.name = name;
        this.createAt = luxon.DateTime.now()
        this.expiredAt = this.createAt.plus({ years: 1 })
        this.isEnabled = true;
    }
    public getName() {
        return this.name;
    }

    public setExpiredAt(date: luxon.DateTime) {
        this.expiredAt = date;
        return this.expiredAt;
    }

    public getExpiredAt() {
        return this.expiredAt;
    }

    public getCreateAt() {
        return this.createAt;
    }

    public getIsEnabled(): boolean {
        return this.isEnabled;
    }
    public setEnable(enable: boolean) {
        this.isEnabled = enable
        return this.isEnabled;
    }

    public getDeposit() {
        return this.deposit;
    }

    public getPaid() {
        return this.paid;
    }

    public setDeposit(deposit: number) {
        this.deposit = deposit;
    }

    public setPaid(paid: number) {
        this.paid = paid;
    }

    public balance(amount: number) {
        if (this.deposit >= amount) {
            this.deposit -= amount;
            this.paid += amount;
        } else {
            throw new Error("Not enough balance.")
        }
    }

    public renew() {
        this.balance(this.RENEWAL_COST);
        this.expiredAt = this.expiredAt.plus({ year: 1 });
    }
}

class Guest extends Member {
    constructor(id: string, name: string, deposit: number) {
        super(id, name, deposit, 50);//7
    }
}

class PermanentMember extends Member {
    isVIP: boolean
    constructor(id: string, name: string, deposit: number) {
        super(id, name, deposit, 100);//7
        this.isVIP = false;
    }
    setVIP(setVIP: boolean): boolean {
        this.isVIP = setVIP;
        return this.isVIP;
    }
}

export { Member, Guest, PermanentMember }