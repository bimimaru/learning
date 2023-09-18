import { Poligon } from "./polygon";

export class Triangle extends Poligon {
    length: number;
    width: number;
    constructor(length: number, width: number) {
        super();
        this.length = length;
        this.width = width;
    }
    override calculateArea(): number {
        return 0.5 * this.length * this.width;
    }
}