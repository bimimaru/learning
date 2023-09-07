/**
 * 1. Find max of array
 * 2. Remove max elements
 * 3. Find max of removed array and return
 */
var array = require("array")


function removeMaxElements(arr) {
    const max = findMax(arr);
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == max) {
            arr.splice(i, 1);
            i--;
        }
    }
    return arr;
}
const arr1 = [9, 0, 7, 9, 10, 10, 8]

console.log(findMin(arr1))


function secondLargestElement(arr) {
    return findMax(removeMaxElements(arr))
}

console.log(secondLargestElement(arr1))