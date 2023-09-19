export class Coordinate {
    private x: number;
    private y: number;
    private isEligible: boolean

    constructor(x: number, y: number) {
        if (x >= 1 && x <= 9) {
            this.x = x;
        } else {
            throw new Error("Your vertical coordinate is out of the board.")
        }
        if (y >= 1 && y <= 10) {
            this.y = y;
        } else {
            throw new Error("Your vertical coordinate is out of the board.")
        }
        this.isEligible = true;
    }
    getEligible() {
        return this.isEligible;
    }
    setEligible(eligible: boolean): boolean {
        this.isEligible = eligible;
        return this.isEligible;
    }
    minusY(y: number): number {
        this.y -= y;
        return this.y
    }
    minusX(x: number): number {
        this.x -= x;
        return this.x
    }
    plusY(y: number): number {
        this.y += y;
        return this.y
    }
    plusX(x: number): number {
        this.x += x
        return this.x
    }
    getX(): number {
        return this.x;
    }
    getY(): number {
        return this.y;
    }
    setX(x: number) {
        this.x = x;
        return this.x;
    }
    setY(y: number) {
        this.y = y;
        return this.y;
    }
}