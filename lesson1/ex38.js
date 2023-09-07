// Find the longest sorted subset array
// Given an array, find the length of longest sorted sub array
function findAscending(arr) {
    if (arr.length == 1) {
        return arr;
    }
    let longestAscendingArr = []
    for (let i = 0; i < arr.length - 1; i++) {
        let arrAtIndexI = [arr[i]]
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] > arr[j - 1]) {
                arrAtIndexI.push(arr[j]);
            }
            else {
                break;
            }
        }
        if (arrAtIndexI.length > longestAscendingArr.length) {
            longestAscendingArr = arrAtIndexI
        }
    }
    return longestAscendingArr

}

const arr1 = [1, 4, 7] // 3 [1,4,7]
const arr2 = [2, 1, 8] // 2 [1,8]
const arr3 = [1, 4, 8, 2] // 3 [1,4,8]
const arr4 = [1] // 1 [1]
const arr5 = [2, 5, 7, 2, 7] // 3 [2,5,7]
console.log(findAscending(arr1))
console.log(findAscending(arr2))
console.log(findAscending(arr3))
console.log(findAscending(arr4))
console.log(findAscending(arr5))
console.log(findAscending([5, 6, 3, 5, 7, 8, 9, 1, 2]))