// Write a function that take a list of numbers
// Return an array of boolean values. Each element indicates that number is prime or not

function isPrime(x) {
    if (x < 2) {
        return false;
    }
    for (let i = 2; i < x; i++) {
        if (x % i == 0) {
            return false;
        }
    }
    return true;
}

function solve(arr) {
    const result = []
    for (let x = 0; x < arr.length; x++) {
        result.push(isPrime(arr[x]))
    }
    return result
}

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];

console.log(solve(arr)) // [false,false,true,true,false,true,false,true,false]
