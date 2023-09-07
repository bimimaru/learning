class Integer {
    constructor(value) {
        this.value = value;
    }
    sub(x) {
        return this.value - x.value;
    }
    sum(x) {
        return this.value + x.value;
    }
    div(x) {
        return this.value / x.value;
    }
    mul(x) {
        return this.value * x.value;
    }
}

const num1 = new Integer(1)
const num4 = new Integer(4)

console.log(num1.sub(num4))