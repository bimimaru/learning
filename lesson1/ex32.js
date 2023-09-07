// Calculate number of duplication of a value inside an array
function numberOfDup(arr, x) {
    let count = 0
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == x) {
            count += 1;
        }
    }
    return count;
}

const arr = [1, 2, 3, 4, 3, 3, 1]
const x = 3
// 3
console.log(numberOfDup(arr, 3))
console.log(numberOfDup(arr, 1))
console.log(numberOfDup(arr, 2))
console.log(numberOfDup(arr, 5))
// const arr = [1, 2, 3, 4, 3, 3, 1]
// const x = 2
// // 1

// const arr = [1, 2, 3, 4, 3, 3, 1]
// const x = 1
// // 2

// const arr = [1, 2, 3, 4, 3, 3, 1]
// const x = 5
// // 0