const { reverseArray } = require("./ex25.js");
function reverseString(a) {
    // "123".split("") => ["1", "2", "3"]
    let arr = a.split("");
    const newArr = reverseArray(arr);
    newArr.join("");
    return newArr;
}



const a1 = "hello"
console.log(reverseString(a1));