// Write a class that represent a rectangle.
// Class should include function to area
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    area() {
        return this.width * this.height;
    }
}
const rect1 = new Rectangle(3, 4)
console.log(rect1.area())
const rect2 = new Rectangle(6, 3)
console.log(rect2.area())
// Try with rect2 with width = 6, height = 3