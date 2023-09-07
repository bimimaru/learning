function mul(a, b): number {
    return a + b;
}

console.log(mul(3, ""))
class Student {
    private name: string
    private age: number
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }


    public getName(): string {
        return this.name;
    }
}

const student = new Student("Jamie", 22);
student.getName()

class Promotion {
    name: string;
    discountValue: number
}

class ProductPromotion extends Promotion {
    products: string[]
}

class CategoryPromotion extends Promotion {
    category: string;
}

new CategoryPromotion().