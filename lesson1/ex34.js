// Find the largest sum of n consecutive elements inside array
function largestSum(arr, n) {
    let max = 0
    for (let i = 0; i <= arr.length - n; i++) {
        sum = 0;
        for (let j = 0; j < n; j++) {
            sum += arr[i + j]
        }
        if (max < sum) {
            max = sum
        }
        //n=1, find max; n= 2: max of sum= arr[i]+arr[i+1]; n= 3, maxSum= arr[i]+arr[i+1]+arr[i+2]
        //n=1, maxSum=arr[i]+arr[i+1]+arr[i+2]+arr[i+3]      
    }
    return max;

}

const arr = [1, 4, 5, 2, 6]
// const n = 1 // 6 because 6 is largest
// const n = 2 // 9 (because 4+5=9 is largest)
// const n = 3 // 13 because 5+2+6 = 13 is largest
// const n = 4 // 17 because 2+5+2+6 = 17 is largest

const arr2 = [6, 2, 8, 3, 2]
// const n = 1 // 8
// const n = 2 // 11 (8+3)
// const n = 3 // 16 (6+2+8)
// const n = 4 // 19 (6+2+8+3)

console.log(largestSum(arr, 1))
console.log(largestSum(arr, 2))
console.log(largestSum(arr, 3))
console.log(largestSum(arr, 4))