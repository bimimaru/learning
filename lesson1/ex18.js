function sum(a, b) {
    return a + b;
}
function sub(a, b) {
    return a - b;
}
function mul(a, b) {
    return a * b;
}
function div(a, b) {
    return a / b
}
console.log(sum(4, 3))

function factorial(x) {
    let a = 1;
    for (let i = 1; i <= x; i++) {
        a *= i;

    }
    return a;
}
console.log(factorial(5))