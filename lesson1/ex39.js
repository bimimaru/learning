// Find the largest product of n element from an array
// solution: find max in the array according to n, push into a new arr, then multiply them
// or multiply each n element then find max of each product.

function largest(arr, n) {
    let maxArr = [];
    let mul = 1;
    let maxMul = 1
    for (let j = 0; j < n; j++) {
        let maxIndex = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > arr[maxIndex]) {
                maxIndex = i
            }
        }
        maxArr.push(arr[maxIndex]);
        arr.splice(maxIndex, 1);
        mul *= maxArr[j];
        if (mul > maxMul) {
            maxMul = mul;
        }
    }
    //console.log(maxArr, arr)
    return maxMul;
}
const arr1 = [1, 5, 2, 7];
/*const n = 1 // 7
const n = 2 // 35 (7*5)
const n = 3 // 70 (7*5*2)
*/
console.log(largest(arr1, 1))
console.log(largest(arr1, 2))
console.log(largest(arr1, 3))
