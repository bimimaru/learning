//i=0, arr[i]=1, temp= 1, arr[i]=arr[arr.length-1-i]=,
//i=1, temp=3,arr[i]= 
function reverseArray(arr) {
    for (let i = arr.length - 1; i >= (arr.length / 2); i--) {
        let temp = arr[i];
        arr[i] = arr[arr.length - 1 - i];
        arr[arr.length - i - 1] = temp;
    }
    return arr;
}

console.log(reverseArray([1, 3, 5, 6]));

module.exports = { reverseArray }; 