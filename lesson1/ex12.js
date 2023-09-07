// Write a function that take a list of numbers
// Return an array of boolean values. Each element indicates that number is prime or not

function isPrime(x) {
    if (x < 0) {
        throw new Error(`${x} can not be negative`)
    }
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
    // Write code here
    for (let x = 0; x < arr.length; x++) {
        try {
            arr[x] = isPrime(arr[x]);
        } catch (e) {
            arr[x] = false;
        }
    }
    return arr;
}


const list = [0, 1, -2, 3, -5, 4, 5, -6, 7, 8];

console.log(solve(list)) // [false,false,false,true,false,false,true,true,false,true,true]