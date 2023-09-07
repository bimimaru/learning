function reverseArray(arr) {
    let arr1 = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        arr1.push(arr[i]);
    }
    return arr1;
}

// temp = a[i]
// arr[i] = arr[arr.length - i - 1]
// arr[arr.length - i - 1] = temp
// [1, 2, 3, 4, 5,6]
// i = 0 | temp = 1 | arr[0] = 4 | arr[3] = 1 => [4, 2, 3, 1]
// i =1 | temp = 2 | arr[1] = 1 | arr[3] = 2 => [4, 1, 3, 2]
// i = 2 | temp = 3 | arr[2] = 2 | arr[3] =3 => [4, 1, 2, 3]
// i =3 | temp = 3 | arr[3] = 3 | arr[3] =3 => [4,1,2,3]

function reverseArray1(arr) {
    for (let i = 0; i < arr.length / 2; i++) {
        const temp = arr[i];
        arr[i] = arr[arr.length - i - 1];
        arr[arr.length - i - 1] = temp;
    }
    return arr
}

console.log(reverseArray1([1, 2, 3, 4, 5]))