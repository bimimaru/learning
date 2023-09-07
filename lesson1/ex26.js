class Circle {
    constructor(radius) {
        this.radius = radius;
    }
    area() {
        return Math.PI * Math.pow(this.radius, 2);
    }
}
class Square {
    constructor(side) {
        this.side = side;
    }
    area() {
        return Math.pow(this.side, 2);
    }
    isCircleInside(circle) {
        if (circle.radius <= this.side / 2) {
            return true;
        } else {
            return false;
        }
    }
    isCircleOutside(circle) {
        //adjacent= sqrt (2*side^2)
        if (circle.radius <= Math.sqrt(2 * Math.pow(this.side, 2))) {
            return true;
        } else {
            return false;
        }
    }
}

const square = new Square(4);
const circle = new Circle(3);


console.log(square.isCircleInside(circle))
console.log(square.isCircleOutside(circle))

// console.log(new Square(4).area());
// console.log(new Circle(5).area());
// console.log(Square.isCircleInside(4), Square.isCircleOutside());