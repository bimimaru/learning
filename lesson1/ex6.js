// Given a function take an array. Find min & max elements of that array
// Return as an array of [minValue,maxValue]

const arr1 = [1, 3, 0, 7, 2, 8];
const arr2 = [3, 6, 2, 9, 5];

function findMax(arr) {
    if (arr.length == 0) {
        return null;
    }

    let max = 0;
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i + 1] > arr[i]) {
            max = arr[i + 1];
        }
    }
    return max;
}
function findMin(arr) {
    if (arr.length == 0) {
        return null;
    }
    let min = 0;
    for (let i = arr.length - 1; i > 0; i--) {
        if (arr[i + 1] < arr[i]) {
            min = arr[i + 1];
        }
    }
    return min;
}

console.log(findMax(arr1), findMin(arr1)) // [0,8]
console.log(findMax(arr2), findMin(arr2)) // [2,9]

