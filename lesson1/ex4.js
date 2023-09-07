// Write a function that take 1 array. 
// Find the largest element

// [4,5,7,2,8]
// i= 0, arr[i]= 4 : arr[i+1]=5 > arr[i] => max=arr[i+1]
// i= 1, arr[i]=5, arr[i+1]=7>arr[i]=>max=arr[i+1]
// i= 2, arr[i]=7, arr[i+1]=2<arr[i]=> max
// i=3, arr[i]=2, arr[i+1]=8>arr[i]=> max = arr[i+1]
// i= 4, arr[i]=8, arr[i+1]= null => max
function findMax(arr) {
    if (arr.length == 0) {
        return null;
    }

    let max = 0;
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i + 1] > arr[i]) {
            max = arr[i + 1];
        }
    }
    return max;
}

const arr1 = [4, 5, 7, 2, 8]
console.log(findMax(arr1)) // 8

const arr2 = []
console.log(findMax(arr2)) // null

const arr3 = [1, 4, 6]
console.log(findMax(arr3)) // 6