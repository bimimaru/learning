// Write a function that take an array and value x
// If array contains x, return index of x
// Else return -1

function find(arr, x) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] != x) {
        } else {
            return i;
        }
        return - 1;
    }
}

const arr1 = [1, 2, 3]
console.log(find(arr1, 1)) // 0

const arr2 = [1, 2, 3]
console.log(find(arr2, 4)) // -1