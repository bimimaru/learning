import { CalculateArea } from "./calculate-area"

export abstract class Poligon implements CalculateArea {
    abstract length: number
    abstract width: number

    abstract calculateArea(): number
}