export class DaThuc {
    private a: number
    private b: number
    constructor(a: number, b: number) {
        if (a == 0) {
            throw new Error("a cannot be zero.")
        } else {
            this.a = a;
        }
        this.b = b;
    }
    calculateF(x: number) {
        return this.a * x + this.b;
    }
    findX(f: number) {
        if (f == 0) {
            return -(this.b / this.a);
        } else {
            return (f - this.b) / this.a;
        }
    }
    congDaThuc(f2: DaThuc) {
        let a = this.a + f2.a;
        let b = this.b + f2.b;
        return new DaThuc(a, b);
    }
}


