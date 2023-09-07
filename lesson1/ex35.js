// Find the smallest sum of n consecutive elements inside array
function leastSum(arr, n) {
    let min = 0;
    for (let i = 0; i <= arr.length - n; i++) {
        sum = 0;
        for (let j = 0; j < n; j++) {
            sum += arr[i + j];
        }
        if (sum < min) {
            min = sum;
        }
    }
    return min;
}

const arr = [1, 4, 5, 2, 6]
// const n = 1 // 1 because 1 is smallest
// const n = 2 // 5 (because 1+4=5 is smallest)
// const n = 3 // 10 because 1+4+5 = 10 is smallest
// const n = 4 // 12 because 1+4+5+2 = 12 is smallest
console.log(leastSum(arr, 1))
console.log(leastSum(arr, 2))
console.log(leastSum(arr, 3))
console.log(leastSum(arr, 4))
//console.log(leastSum(arr2, 1))
const arr2 = [6, 2, 8, 3, 2]
// const n = 1 // 2
// const n = 2 // 5 (3+2)
// const n = 3 // 13 (2+8+3)
// const n = 4 // 15 (2+8+3+2)
