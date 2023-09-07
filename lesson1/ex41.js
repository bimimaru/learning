// Given an array
// Return an object, 
// key is an element in array, value is number of occurences of that element
function returnObject(arr) {
    let object = {};
    for (let i = 0; i < arr.length; i++) {
        let count = 0
        for (let j = 0; j < arr.length; j++) {
            if (arr[i] == arr[j]) {
                count++;
            }
        }
        const a = { "1": 2, "3": 5 }
        object[arr[i]] = count;
        console.log(arr[i], count)
    }
    return object;
}
const arr1 = [3, 5, 7, 8, 2, 3, 2, 2, 1]
/*res = {
    "3": 2,
    "5": 1,
    "7": 1,
    "8": 1,
    "2": 3,
    "1": 1
*/
console.log(returnObject(arr1))
// object.key=value; => {"key":value}
// object[key]=value; => {"key":value}
// object[3] = 2 => {"3": 2}
