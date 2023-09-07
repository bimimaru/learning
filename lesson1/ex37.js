// Check if an array is ascending sorted
// An ascending sorted array is an array that the next element is always larger than
// the previous element
function isAscending(arr) {
    if (arr.length == 1) {
        return true;
    }
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i + 1] < arr[i]) {
            return false;
        }
    }
    return true;
}

const arr1 = [1, 4, 7] // true
const arr2 = [2, 1, 8] // false
const arr3 = [1, 4, 8, 2] // false
const arr4 = [1] // true
console.log(isAscending(arr1))
console.log(isAscending(arr2))
console.log(isAscending(arr3))
console.log(isAscending(arr4))
