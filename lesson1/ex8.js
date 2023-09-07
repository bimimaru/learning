// Write a function that take an array, value want to replace and new value
// Replace all elements with new value
function replacement(arr, x, y) {
    if (arr.length == 0) {
        return arr;
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] != x) {
        } else {
            arr.splice(i, 1, y);
        }
    }
    return arr;
}

const arr1 = ['L', 'A', 'C', 'D', 'E', 'C'];
console.log(replacement(arr1, 'C', 'N')); // ['L', 'A', 'N','D','E', 'N']

const arr2 = ['A', 'B', 'C', 'D'];
console.log(replacement(arr2, 'E', 'F')); // ['A','B','C','D']
const arr3 = [];
console.log(replacement(arr3, 'E', 'F'));