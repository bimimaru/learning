// Write a function that take 2 arguments of input: an array & a value. 
// If array is empty, add value to array
// If array is not empty, remove last element and add value to the end of array

function arrayExecution(arr, x) {
    if (arr.length == 0) {
        arr.push(x);
    } else {
        arr.splice(arr.length - 1, 1, x);
    }
    return arr;
}

const arr1 = [];
console.log(arrayExecution(arr1, 5)) // [5]
const arr2 = [1, 2];
console.log(arrayExecution(arr2, 5)) // [1,5]