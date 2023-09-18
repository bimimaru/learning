import { CalculateArea } from "./calculate-area";

export class Circle implements CalculateArea {
    private radius: number
    constructor(radius: number) {
        this.radius = radius
    }

    calculateArea(): number {
        return Math.PI * Math.pow(this.radius, 2)
    }
}