const arr1 = [1, 3, 4, 5, 8, true]
arr1.push(6);

// 1 3 4 5 | x = 4
//i=0 , arr[i]=1 , != x > no
//i=1, arr
// function findElementInArray(arr, x) {

//     for (let i = 0, i<arr.length; i++) {
//         if (arr[i] != x) {
//             continue;
//         } else {
//             return "yes";
//         }
//         return "no";
//     }
// }
// console.log(findElementInArray(arr1, 6))

// function multiplyOfEvenNumbers(arr) {
//     let mul = 1
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i] % 2 == 0) {
//             mul *= arr[i];
//         }
//     }
//     return mul;
// }

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


function multiplyOfPrimeNumbers(arr) {
    let mul = 1;
    for (let i = 0; i < arr.length; i++) {
        if (isPrime(arr[i])) {
            mul *= arr[i];
        }
    }
    return mul;
}

console.log(multiplyOfPrimeNumbers(arr1))
