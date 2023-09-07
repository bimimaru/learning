// Check if the product of all elements in array is positive or negative
// Return true if positive, false if negative
// NO MULTIPLY OPERATOR USED
function isPositive(arr) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == 0) {
            return null;
        }
        else if (arr[i] < 0) {
            count += 1;
        }
    }
    if (count % 2 == 0 || count == 0) {
        return true;
    } else {
        return false;
    }
}

const arr1 = [-1, 2, 2] // false
const arr2 = [-2, -3, 2] // true
const arr3 = [2, 3, 4] // true
const arr4 = [-2, 0, 2] // true
const arr5 = [-5, - 2, -3] // false
console.log(isPositive(arr1))
console.log(isPositive(arr2))
console.log(isPositive(arr3))
console.log(isPositive(arr4))
console.log(isPositive(arr5))