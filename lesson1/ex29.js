// Find consevacutive subset array.
// Given 2 array(at least 2 elements). Return true if arr1 contains array2. Otherwise return false

// arr1 = [1,3,5,6] | arr2 = [3,5] => true 
// arr1 = [1,2,4,5] | arr2 = [2,3] => false
//i= 1, arr1[1]=3 == arr2[0], arr1[2]=5 == arr[1]
function isConsecutiveArr(arr1, arr2) {
    if (arr1.length < 2 || arr2.length < 2) {
        return null;
    }
    for (let i = 0; i < arr1.length - 1; i++) {
        for (let j = 0; j < arr2.length - 1; j++) {
            if (arr1[i] == arr2[j] && arr1[i + 1] == arr2[j + 1]) {
                return true;
            }
        }
    }
    return false;
}

let arr1 = [1, 2, 4, 5, 6]
let arr2 = [2, 4, 5]
console.log(isConsecutiveArr(arr1, arr2))