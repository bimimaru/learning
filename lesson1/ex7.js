// Given a function takes 2 arrays. Find min & max elements in 2 array
// Return as an array of [minValue,maxValue]

const arr1 = [1, 3, 0, 7, 2, 8];
const arr2 = [3, 6, 2, 9, 5];

const mergeArr = arr1 + arr2;
console.log(mergeArr);
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
    if (findMax(arr1) > findMax(arr2)) {
        return findMax;
    }
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
    if (findMin(arr1) < findMin(arr2)) {
        return findMin;
    }
}


console.log(findMin(arr1 + arr2), findMax(arr1 + arr2)) // [0,9]