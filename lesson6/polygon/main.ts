import { CalculateArea } from "./calculate-area";
import { Circle } from "./circle";
import { HourGlass } from "./hourglass";
import { Poligon } from "./polygon";
import { Rectangle } from "./rectangle";
import { Triangle } from "./triangle";
import { Oval } from "./oval"

const rec1 = new Rectangle(10, 20);
const rec2 = new Rectangle(5, 10);
const tri1 = new Triangle(1, 2);
const cir1 = new Circle(10);
const hg1 = new HourGlass();
const hg2 = new HourGlass();
const h3 = new Oval();

// Get sum of areas
function calculateAreas(items: CalculateArea[]): number {
    let result = 0
    for (let i = 0; i < items.length; i++) {
        result += items[i].calculateArea()
    }
    return result;
}

console.log(calculateAreas([rec1, rec2, tri1, cir1, hg1, hg2, h3]));