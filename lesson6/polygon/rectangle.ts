import { CalculateArea } from "./calculate-area";
import { Poligon } from "./polygon";

export class Rectangle extends Poligon {
    length: number;
    width: number;
    constructor(length: number, width: number) {
        super();
        this.length = length;
        this.width = width;
    }
    override calculateArea(): number {
        return this.length * this.width;
    }
}